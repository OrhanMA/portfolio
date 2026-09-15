import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

const isDevelopment = process.env.NODE_ENV === "development";

function createNonce() {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

function createContentSecurityPolicy(nonce: string) {
  const developmentSources = isDevelopment ? " 'unsafe-eval'" : "";
  const styleSource = isDevelopment
    ? "style-src-elem 'self' 'unsafe-inline'"
    : `style-src-elem 'self' 'nonce-${nonce}'`;

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${developmentSources} https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net`,
    styleSource,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://vitals.vercel-insights.com https://*.vercel-insights.com https://www.google.com https://www.recaptcha.net",
    "frame-src https://www.google.com https://www.recaptcha.net https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com",
    "upgrade-insecure-requests",
  ].join("; ");
}

function getLocale(request: NextRequest): Locale {
  // 1. Check cookie for saved preference
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 2. Negotiate from Accept-Language header
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    return match(languages, locales as unknown as string[], defaultLocale) as Locale;
  } catch {
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const nonce = createNonce();
  const contentSecurityPolicy = createContentSecurityPolicy(nonce);

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("x-pathname", pathname);
    requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", contentSecurityPolicy);
    return response;
  }

  // Redirect to the detected locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
