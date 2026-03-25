// apps/web/src/app/admin/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/features/auth/api";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      window.location.href = data.redirectUrl || "/admin/inventories";
    } catch (err) {
      alert((err as Error).message);
      return;
    }
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
