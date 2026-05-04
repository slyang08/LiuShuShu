// apps/web/src/app/api/auth/change-password/route.ts
import { NextRequest, NextResponse } from "next/server";

import { API_BASE_URL } from "@/lib/config";
import { serverFetch } from "@/lib/serverFetch";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const accessToken = req.cookies.get("access_token")?.value;

    const res = await serverFetch(`${API_BASE_URL}/admin/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: `Internal error: ${error}` }, { status: 500 });
  }
}
