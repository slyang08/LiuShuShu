// apps/web/src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  // Not logged in, if accesses /admin/* all jump to /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!accessToken) {
      // yet login, to /admin/login
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

// Intercept only the /admin route
export const config = {
  matcher: "/admin/:path*",
};
