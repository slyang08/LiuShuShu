// apps/web/src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value || null;
  const url = req.nextUrl.clone();

  // 沒登入，訪問 /admin/* → 跳回登入
  if (!accessToken && url.pathname.startsWith("/admin") && url.pathname !== "/admin") {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // 已登入，訪問 /admin → 跳到 /admin/inventories
  if (accessToken && url.pathname === "/admin") {
    url.pathname = "/admin/inventories";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 只攔截 /admin 路由
export const config = {
  matcher: "/admin/:path*",
};
