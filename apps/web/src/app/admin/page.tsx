// apps/web/src/app/admin/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    window.location.href = "/admin/inventories";
  };

  return (
    <>
      <div className="mt-[20vh] flex flex-col items-center space-y-4">
        <input
          className="rounded-md border-2 p-2"
          placeholder="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="rounded-md border-2 p-2"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </>
  );
}
