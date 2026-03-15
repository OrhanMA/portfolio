import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function createRequest(
  pathname: string,
  options?: {
    cookie?: { name: string; value: string };
    acceptLanguage?: string;
  }
): NextRequest {
  const url = `http://localhost:3000${pathname}`;
  const headers = new Headers();
  if (options?.acceptLanguage) {
    headers.set("accept-language", options.acceptLanguage);
  }

  const request = new NextRequest(url, { headers });

  if (options?.cookie) {
    request.cookies.set(options.cookie.name, options.cookie.value);
  }

  return request;
}

/** Extract the pathname from a redirect response's Location header */
function getRedirectPathname(response: ReturnType<typeof proxy>): string {
  const location = response?.headers.get("location") ?? "";
  return new URL(location).pathname;
}

describe("proxy", () => {
  it("returns undefined when pathname starts with /fr/", () => {
    const result = proxy(createRequest("/fr/contact"));
    expect(result).toBeUndefined();
  });

  it("returns undefined when pathname is exactly /fr", () => {
    const result = proxy(createRequest("/fr"));
    expect(result).toBeUndefined();
  });

  it("returns undefined when pathname starts with /en/", () => {
    const result = proxy(createRequest("/en/articles"));
    expect(result).toBeUndefined();
  });

  it("redirects to /fr by default (no cookie, no Accept-Language)", () => {
    const result = proxy(createRequest("/"));
    expect(result?.status).toBe(307);
    const pathname = getRedirectPathname(result);
    expect(pathname).toMatch(/^\/fr/);
  });

  it("redirects to /fr/contact when NEXT_LOCALE cookie is fr", () => {
    const result = proxy(
      createRequest("/contact", {
        cookie: { name: "NEXT_LOCALE", value: "fr" },
      })
    );
    expect(result?.status).toBe(307);
    const pathname = getRedirectPathname(result);
    expect(pathname).toBe("/fr/contact");
  });

  it("redirects to /en/contact when NEXT_LOCALE cookie is en", () => {
    const result = proxy(
      createRequest("/contact", {
        cookie: { name: "NEXT_LOCALE", value: "en" },
      })
    );
    expect(result?.status).toBe(307);
    const pathname = getRedirectPathname(result);
    expect(pathname).toBe("/en/contact");
  });

  it("redirects based on Accept-Language: en", () => {
    const result = proxy(
      createRequest("/", { acceptLanguage: "en-US,en;q=0.9" })
    );
    expect(result?.status).toBe(307);
    const pathname = getRedirectPathname(result);
    expect(pathname).toMatch(/^\/en/);
  });

  it("preserves pathname after locale prefix", () => {
    const result = proxy(createRequest("/articles/odoo-session-timeout"));
    expect(result?.status).toBe(307);
    const pathname = getRedirectPathname(result);
    expect(pathname).toContain("/articles/odoo-session-timeout");
  });

  it("redirects to /fr as fallback for unsupported Accept-Language", () => {
    const result = proxy(
      createRequest("/", { acceptLanguage: "de-DE,de;q=0.9" })
    );
    expect(result?.status).toBe(307);
    const pathname = getRedirectPathname(result);
    expect(pathname).toMatch(/^\/fr/);
  });
});
