// apps/web/src/app/api/auth/change-password/route.ts
import { serverFetch } from "@/lib/serverFetch";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await serverFetch(
      `https://liushushu-api-latest.onrender.com/admin/auth/change-password`,
      {
        method: "PATCH",
        body,
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: `Internal error: ${error}` }, { status: 500 });
  }
}
