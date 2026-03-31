// apps/web/src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out" },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );

  // Delete cookie
  response.cookies.set("access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // Expires immediately
    maxAge: 0,
  });

  return response;
}
