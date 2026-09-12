import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = process.cwd();
const budgetPath = path.resolve(root, "performance-budget.json");
const buildIdPath = path.resolve(root, ".next/BUILD_ID");

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function getAvailablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : null;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  if (!port) throw new Error("Could not allocate a local port");
  return port;
}

async function waitForServer(url, child, output) {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited before serving the build:\n${output.join("")}`);
    }

    try {
      const response = await fetch(url);
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // The server is still starting.
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}:\n${output.join("")}`);
}

function assertNumber(value, label) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} is not a finite non-negative number`);
  }
}

const measurements = [];
let serverProcess;
let browser;

try {
  const buildId = (await readFile(buildIdPath, "utf8")).trim();
  if (!buildId) throw new Error(".next/BUILD_ID is empty; run pnpm build first");

  const budget = JSON.parse(await readFile(budgetPath, "utf8"));
  if (!budget.routes || typeof budget.routes !== "object") {
    throw new Error("performance-budget.json must define a routes object");
  }

  const configuredOrigin = process.env.PERFORMANCE_BASE_URL?.replace(/\/$/, "");
  let origin = configuredOrigin;

  if (!origin) {
    const port = await getAvailablePort();
    origin = `http://127.0.0.1:${port}`;
    const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
    const output = [];
    serverProcess = spawn(
      command,
      ["exec", "next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
      {
        cwd: root,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    serverProcess.stdout.on("data", (chunk) => output.push(String(chunk)));
    serverProcess.stderr.on("data", (chunk) => output.push(String(chunk)));
    await waitForServer(`${origin}/fr`, serverProcess, output);
  }
  browser = await chromium.launch();

  for (const route of Object.keys(budget.routes)) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      localStorage.setItem(
        "cookie-consent",
        JSON.stringify({
          necessary: true,
          analytics: false,
          version: 2,
          decidedAt: Date.now(),
        }),
      );
    });

    try {
      const response = await page.goto(`${origin}${route}`, {
        waitUntil: "networkidle",
        timeout: 60_000,
      });
      if (!response || response.status() !== 200) {
        throw new Error(`${route}: expected HTTP 200, got ${response?.status() ?? "no response"}`);
      }

      const data = await page.evaluate(() => {
        const resources = performance.getEntriesByType("resource");
        const navigation = performance.getEntriesByType("navigation")[0];
        const js = resources.filter((entry) => /\.js(?:\?|$)/.test(entry.name));
        const fonts = resources.filter((entry) => /\.woff2(?:\?|$)/.test(entry.name));
        const documentEncoded = navigation?.encodedBodySize ?? 0;
        const sumEncoded = (entries) =>
          entries.reduce((total, entry) => total + entry.encodedBodySize, 0);
        return {
          jsEncoded: sumEncoded(js),
          documentEncoded,
          fonts: sumEncoded(fonts),
          domElements: document.querySelectorAll("*").length,
        };
      });

      for (const [label, value] of Object.entries(data)) {
        assertNumber(value, `${route} ${label}`);
      }
      if (errors.length > 0) {
        throw new Error(`${route}: browser errors:\n${errors.join("\n")}`);
      }

      measurements.push({ route, ...data });
    } finally {
      await context.close();
    }
  }

  const violations = [];
  for (const measurement of measurements) {
    const limits = budget.routes[measurement.route];
    const checks = [
      ["JS encoded", measurement.jsEncoded, limits.jsEncoded],
      ["document encoded", measurement.documentEncoded, limits.documentEncoded],
      ["fonts", measurement.fonts, limits.fonts],
      ["DOM elements", measurement.domElements, limits.domElements],
    ];

    for (const [label, actual, limit] of checks) {
      assertNumber(limit, `${measurement.route} ${label} limit`);
      if (actual > limit) {
        const unit = label === "DOM elements" ? "" : " bytes";
        violations.push(
          `${measurement.route}: ${label} ${actual}${unit} > ${limit}${unit}`,
        );
      }
    }
  }

  if (violations.length > 0) {
    console.error(`Route performance budget exceeded for build ${buildId}:\n${violations.join("\n")}`);
    process.exitCode = 1;
  } else {
    console.log(
      `Route performance budgets respected for build ${buildId} (${measurements.length} current production routes measured).`,
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (serverProcess && serverProcess.exitCode === null) {
    serverProcess.kill("SIGTERM");
  }
}
