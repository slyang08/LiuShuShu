// apps/web/src/app/api/admin/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    console.log("🔵 TOKEN FROM COOKIE:", token);

    if (!token) {
      return NextResponse.json({ message: "No token in cookie" }, { status: 401 });
    }

    const res = await fetch("https://liushushu-api-latest.onrender.com/admin/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ message: "Invalid response from API" }, { status: 500 });
    }

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/admin/auth/me error:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
