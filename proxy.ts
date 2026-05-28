import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEFAULT_SITE_LOCALE, isSiteLocale, SITE_LOCALES, type SiteLocale } from "./app/lib/locale";

function hasFileExtension(pathname: string) {
  const lastSegment = pathname.split("/").pop() ?? "";
  return lastSegment.includes(".");
}

function withPathnameHeader(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

function preferredLocale(request: NextRequest): SiteLocale {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_SITE_LOCALE;

  const candidates = header
    .split(",")
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { tag: tag.toLowerCase(), quality: Number.isFinite(quality) ? quality : 1 };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of candidates) {
    const base = tag.split("-")[0];
    if (isSiteLocale(base)) return base;
  }

  return DEFAULT_SITE_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/pdf-viewer") ||
    hasFileExtension(pathname)
  ) {
    return NextResponse.next();
  }

  const isAlreadyLocalized = SITE_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (isAlreadyLocalized) {
    return withPathnameHeader(request);
  }

  const locale = pathname === "/" ? preferredLocale(request) : DEFAULT_SITE_LOCALE;
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin).*)"],
};
