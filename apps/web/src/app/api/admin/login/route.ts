// apps/web/src/app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await fetch("https://liushushu-api-latest.onrender.com/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("POST /admin/login body:", body);
    console.log("apiRes.status:", apiRes.status);

    const text = await apiRes.text();
    console.log("RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { message: `External API returned non-JSON response (${apiRes.status})` },
        { status: 500 }
      );
    }

    if (!apiRes.ok) {
      console.log("External API login error:", data);
      return NextResponse.json(data, { status: apiRes.status });
    }

    if (!data.token) {
      console.error("No token returned from external API:", data);
      return NextResponse.json({ message: "No token returned from external API" }, { status: 500 });
    }

    const response = NextResponse.json(data);
    response.cookies.set("access_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Next.js login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
