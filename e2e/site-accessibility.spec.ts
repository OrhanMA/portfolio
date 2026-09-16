import AxeBuilder from "@axe-core/playwright";
import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

const PUBLIC_ORIGIN = "https://orhanmadiassani.com";
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

type LinkTarget = {
  source: string;
  path: string;
  hash: string;
};

type PageAudit = {
  findings: string[];
  links: Array<{
    href: string;
    path: string;
    hash: string;
    isInternal: boolean;
  }>;
};

async function getSitemapPaths(request: APIRequestContext) {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    return `${url.pathname}${url.search}`;
  });

  expect(paths.length).toBeGreaterThanOrEqual(100);
  return paths;
}

async function preparePage(page: Page) {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
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
    localStorage.setItem("theme", "light");
  });
}

function formatAxeViolations(violations: Awaited<
  ReturnType<AxeBuilder["analyze"]>
>["violations"]) {
  return violations.flatMap((violation) =>
    violation.nodes.map(
      (node) =>
        `${violation.id}: ${violation.help}\n${node.target.join(", ")}\n${node.failureSummary ?? ""}`,
    ),
  );
}

async function inspectPage(page: Page): Promise<PageAudit> {
  return page.evaluate((publicOrigin) => {
    const findings: string[] = [];
    const links: PageAudit["links"] = [];
    const whitespace = /\s+/g;

    const textFor = (element: Element | null) =>
      element?.textContent?.replace(whitespace, " ").trim() ?? "";
    const idsFor = (value: string | null) =>
      (value ?? "").split(whitespace).filter(Boolean);
    const hasAccessibleName = (element: Element) => {
      const ariaLabel = element.getAttribute("aria-label")?.trim();
      if (ariaLabel) return true;

      const labelledBy = idsFor(element.getAttribute("aria-labelledby"));
      if (labelledBy.length > 0) {
        return labelledBy.some((id) => Boolean(textFor(document.getElementById(id))));
      }

      if (textFor(element)) return true;
      return [...element.querySelectorAll("img[alt]")].some((image) =>
        Boolean(image.getAttribute("alt")?.trim()),
      );
    };
    const isInert = (element: Element) => Boolean(element.closest("[inert]"));
    const isFocusable = (element: Element) => {
      if (isInert(element) || element.getAttribute("tabindex") === "-1") {
        return false;
      }
      if (element.matches("[disabled], [aria-disabled='true']")) return false;
      return element.matches(
        "a[href], button, input, select, textarea, summary, [contenteditable='true'], [tabindex]:not([tabindex='-1'])",
      );
    };

    const ids = [...document.querySelectorAll<HTMLElement>("[id]")].map(
      (element) => element.id,
    );
    for (const id of new Set(ids)) {
      if (ids.filter((candidate) => candidate === id).length > 1) {
        findings.push(`duplicate id: ${id}`);
      }
    }

    for (const image of document.querySelectorAll("img")) {
      if (!image.hasAttribute("alt")) {
        findings.push(`image without alt: ${image.getAttribute("src") ?? "unknown source"}`);
      }
    }

    for (const element of document.querySelectorAll<HTMLElement>(
      "[aria-labelledby], [aria-describedby], [aria-controls], [aria-errormessage]",
    )) {
      for (const attribute of [
        "aria-labelledby",
        "aria-describedby",
        "aria-controls",
        "aria-errormessage",
      ]) {
        for (const id of idsFor(element.getAttribute(attribute))) {
          if (!document.getElementById(id)) {
            findings.push(`${attribute} references missing id: ${id}`);
          }
        }
      }
    }

    for (const element of document.querySelectorAll<HTMLElement>("[aria-expanded]")) {
      const expanded = element.getAttribute("aria-expanded");
      if (expanded !== "true" && expanded !== "false") {
        findings.push(`invalid aria-expanded value: ${expanded ?? "missing"}`);
      }
      const controlledId = element.getAttribute("aria-controls");
      if (controlledId && !document.getElementById(controlledId)) {
        findings.push("aria-expanded control with an invalid aria-controls target");
      }
    }

    for (const hidden of document.querySelectorAll("[aria-hidden='true']")) {
      const focusable = [...hidden.querySelectorAll<HTMLElement>(
        "a[href], button, input, select, textarea, summary, [contenteditable='true'], [tabindex]:not([tabindex='-1'])",
      )].find(isFocusable);
      if (focusable) {
        findings.push(`focusable descendant under aria-hidden: ${focusable.tagName.toLowerCase()}`);
      }
    }

    for (const button of document.querySelectorAll<HTMLButtonElement>("button")) {
      if (!button.hasAttribute("type")) {
        findings.push(`button without explicit type: ${textFor(button) || "unnamed"}`);
      }
      if (!hasAccessibleName(button)) {
        findings.push("button without an accessible name");
      }
    }

    for (const field of document.querySelectorAll<HTMLElement>(
      "input:not([type='hidden']):not([tabindex='-1']), textarea, select, [role='combobox']",
    )) {
      const id = field.getAttribute("id");
      const labelledBy = field.getAttribute("aria-labelledby");
      const hasLabel = Boolean(id && document.querySelector(`label[for='${CSS.escape(id)}']`));
      const hasName = Boolean(
        field.getAttribute("aria-label")?.trim() || labelledBy?.trim() || hasLabel,
      );
      if (!hasName) {
        findings.push(`form field without label: ${field.getAttribute("name") ?? field.tagName.toLowerCase()}`);
      }
    }

    for (const anchor of document.querySelectorAll<HTMLAnchorElement>("a")) {
      const href = anchor.getAttribute("href")?.trim() ?? "";
      if (!href) {
        findings.push("anchor without href");
        continue;
      }
      if (!hasAccessibleName(anchor)) {
        findings.push(`link without an accessible name: ${href}`);
      }

      const target = anchor.getAttribute("target");
      if (target === "_blank") {
        const rel = new Set((anchor.getAttribute("rel") ?? "").split(whitespace));
        if (!rel.has("noopener") || !rel.has("noreferrer")) {
          findings.push(`new-tab link missing noopener noreferrer: ${href}`);
        }
      }

      if (/^(mailto:|tel:)/i.test(href)) {
        if (!/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/i.test(href) && !/^tel:\+?[0-9().\-\s]+$/i.test(href)) {
          findings.push(`invalid contact link: ${href}`);
        }
        continue;
      }

      try {
        const resolved = new URL(href, window.location.href);
        if (resolved.protocol !== "http:" && resolved.protocol !== "https:") {
          findings.push(`unsafe link protocol: ${href}`);
          continue;
        }
        const isInternal = resolved.origin === window.location.origin;
        if (!isInternal && resolved.origin === publicOrigin) {
          findings.push(`public origin mismatch: ${href}`);
        }
        links.push({
          href,
          path: `${resolved.pathname}${resolved.search}`,
          hash: resolved.hash,
          isInternal,
        });
      } catch {
        findings.push(`invalid URL: ${href}`);
      }
    }

    return { findings, links };
  }, PUBLIC_ORIGIN);
}

test("every public route satisfies its navigation and accessibility contract", async ({
  page,
  request,
}) => {
  test.setTimeout(600_000);
  await preparePage(page);

  const routes = await getSitemapPaths(request);
  const findings: string[] = [];
  const internalTargets = new Map<string, LinkTarget>();

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "load" });
    if (response?.status() !== 200) {
      findings.push(`${route}: rendered with HTTP ${response?.status() ?? "no response"}`);
      continue;
    }

    const audit = await inspectPage(page);
    findings.push(...audit.findings.map((finding) => `${route}: ${finding}`));

    const axe = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    findings.push(
      ...formatAxeViolations(axe.violations).map(
        (violation) => `${route}: ${violation}`,
      ),
    );

    for (const link of audit.links) {
      if (!link.isInternal) continue;
      const target = `${link.path}${link.hash}`;
      internalTargets.set(target, { source: route, path: link.path, hash: link.hash });
    }
  }

  for (const target of internalTargets.values()) {
    const response = await request.get(target.path);
    if (response.status() !== 200) {
      findings.push(`${target.source}: ${target.path} resolves to HTTP ${response.status()}`);
      continue;
    }

    const responseHtml = await response.text();
    const contentType = response.headers()["content-type"] ?? "";
    if (!contentType.includes("text/html")) {
      continue;
    }
    const canonical = responseHtml.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
    if (canonical !== `${PUBLIC_ORIGIN}${target.path}`) {
      findings.push(`${target.source}: ${target.path} has canonical ${canonical ?? "missing"}`);
    }

    if (target.hash) {
      await page.goto(`${target.path}${target.hash}`, { waitUntil: "load" });
      const id = decodeURIComponent(target.hash.slice(1));
      const hashTargetExists = await page.evaluate((targetId) =>
        Boolean(document.getElementById(targetId)),
      id);
      if (!hashTargetExists) {
        findings.push(`${target.source}: ${target.path}${target.hash} targets no rendered id`);
      }
    }
  }

  expect(findings, findings.join("\n\n")).toEqual([]);
});
