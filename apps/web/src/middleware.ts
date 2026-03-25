// apps/web/src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  // Not logged in, if accesses /admin/* all jump to /admin/login
  if (pathname.startsWith("/admin/") && pathname !== "/admin/login") {
    if (!accessToken) {
      // yet login, to /admin/login
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // 已登入，訪問 /admin → 跳到 /admin/inventories
  if (accessToken && pathname === "/admin") {
    // logged in, to /admin/inventories
    return NextResponse.redirect(new URL("/admin/inventories", req.url));
  }

  return NextResponse.next();
}

// 只攔截 /admin 路由
export const config = {
  matcher: "/admin/:path*",
};
