import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEFAULT_SITE_LOCALE, SITE_LOCALES } from "./app/lib/locale";

function hasFileExtension(pathname: string) {
  const lastSegment = pathname.split("/").pop() ?? "";
  return lastSegment.includes(".");
}

function withPathnameHeader(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
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

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_SITE_LOCALE}` : `/${DEFAULT_SITE_LOCALE}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin).*)"],
};
