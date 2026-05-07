// apps/web/src/proxy.ts
import createMiddleware from "next-intl/middleware";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  console.log("🔍 proxy:", pathname, "token:", accessToken ? "exists" : "missing");

  // Not logged in, if accesses /admin/* all jump to /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!accessToken) {
      // yet login, to /admin/login
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Public route with next-intl
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    return intlMiddleware(req);
  }

  return NextResponse.next();
}

// Intercept only the /admin route
export const config = {
  matcher: [
    "/admin/:path*",
    "/",
    "/(en|zh-CN|zh-TW|ms)/:path*",
    "/durians/:path*",
    "/map",
    "/contact",
  ],
};
