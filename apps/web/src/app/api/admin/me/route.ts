// apps/web/src/app/api/admin/me/route.ts
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await serverFetch("https://liushushu-api-latest.onrender.com/admin/auth/me", {
      method: "GET",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/admin/auth/me error:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
