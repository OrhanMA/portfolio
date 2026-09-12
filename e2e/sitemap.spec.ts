import { expect, test, type APIRequestContext } from "@playwright/test";
import { JSDOM } from "jsdom";

const PUBLIC_ORIGIN = "https://orhanmadiassani.com";
const BATCH_SIZE = 8;

async function inBatches<T>(
  items: readonly T[],
  task: (item: T) => Promise<void>,
) {
  for (let index = 0; index < items.length; index += BATCH_SIZE) {
    await Promise.all(items.slice(index, index + BATCH_SIZE).map(task));
  }
}

async function getSitemapUrls(request: APIRequestContext) {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

test("every sitemap route and internal link is structurally healthy", async ({
  request,
}) => {
  test.setTimeout(120_000);

  const sitemapUrls = await getSitemapUrls(request);
  const errors: string[] = [];
  const internalPaths = new Set<string>();

  expect(sitemapUrls.length).toBeGreaterThanOrEqual(100);

  await inBatches(sitemapUrls, async (publicUrl) => {
    const publicLocation = new URL(publicUrl);
    const path = `${publicLocation.pathname}${publicLocation.search}`;
    const response = await request.get(path);

    if (response.status() !== 200) {
      errors.push(`${path}: HTTP ${response.status()}`);
      return;
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const locale = publicLocation.pathname.split("/")[1];
    const csp = response.headers()["content-security-policy"] ?? "";
    const nonce = csp.match(/'nonce-([^']+)'/)?.[1];

    if (!nonce || /script-src[^;]*'unsafe-inline'/.test(csp)) {
      errors.push(`${path}: unsafe or missing nonce-based CSP`);
    } else {
      for (const element of document.querySelectorAll(
        "script, style, link[rel='stylesheet']",
      )) {
        if (element.getAttribute("nonce") !== nonce) {
          errors.push(`${path}: ${element.tagName.toLowerCase()} missing CSP nonce`);
          break;
        }
      }
    }

    const h1Count = document.querySelectorAll("h1").length;
    if (h1Count !== 1) errors.push(`${path}: ${h1Count} H1`);

    if (document.querySelectorAll("main").length !== 1) {
      errors.push(`${path}: invalid main landmark count`);
    }
    if (document.querySelectorAll("header#primary-navigation").length !== 1) {
      errors.push(`${path}: primary navigation missing or duplicated`);
    }
    const identities = document.querySelectorAll<HTMLAnchorElement>(
      "[data-site-identity]",
    );
    if (identities.length !== 1) {
      errors.push(`${path}: ${identities.length} site identities`);
    } else {
      const identity = identities[0];
      const identityName = identity.textContent?.replace(/\s+/g, " ").trim();
      if (identityName !== "Orhan Madi Assani") {
        errors.push(`${path}: site identity is ${identityName ?? "missing"}`);
      }
      if (identity.getAttribute("href") !== `/${locale}`) {
        errors.push(`${path}: site identity has an invalid home link`);
      }
      const identityImage = identity.querySelector<HTMLImageElement>(
        "img[data-site-identity-photo]",
      );
      if (!identityImage || identityImage.getAttribute("alt") !== "") {
        errors.push(`${path}: site identity portrait is missing or not decorative`);
      }
    }
    if (document.querySelectorAll("footer").length !== 1) {
      errors.push(`${path}: footer missing or duplicated`);
    }
    if (document.documentElement.lang !== locale) {
      errors.push(`${path}: html lang is ${document.documentElement.lang}`);
    }

    const canonical = document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.getAttribute("href");
    if (canonical !== publicUrl) {
      errors.push(`${path}: canonical is ${canonical ?? "missing"}`);
    }

    const imagesWithoutAlt = document.querySelectorAll("img:not([alt])").length;
    if (imagesWithoutAlt > 0) {
      errors.push(`${path}: ${imagesWithoutAlt} image(s) without alt`);
    }

    const ids = [...document.querySelectorAll<HTMLElement>("[id]")].map(
      (element) => element.id,
    );
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    if (duplicateIds.length > 0) {
      errors.push(`${path}: duplicate ids ${duplicateIds.join(", ")}`);
    }

    const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
    for (let index = 1; index < headings.length; index += 1) {
      const previous = Number(headings[index - 1]?.tagName.slice(1));
      const current = Number(headings[index]?.tagName.slice(1));
      if (current > previous + 1) {
        errors.push(`${path}: heading jump H${previous} → H${current}`);
        break;
      }
    }

    for (const script of document.querySelectorAll<HTMLScriptElement>(
      'script[type="application/ld+json"]',
    )) {
      try {
        JSON.parse(script.textContent ?? "");
      } catch {
        errors.push(`${path}: invalid JSON-LD`);
      }
    }

    for (const anchor of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || /^(mailto:|tel:)/.test(href)) continue;

      const resolved = new URL(href, PUBLIC_ORIGIN);
      if (resolved.origin !== PUBLIC_ORIGIN) continue;
      internalPaths.add(`${resolved.pathname}${resolved.search}`);
    }

    dom.window.close();
  });

  await inBatches([...internalPaths], async (path) => {
    const response = await request.get(path);
    if (!response.ok()) errors.push(`${path}: broken internal link (${response.status()})`);
  });

  expect(errors, errors.join("\n")).toEqual([]);
});
