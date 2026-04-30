// apps/web/src/app/admin/(auth)/login/page.tsx
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { login } from "@/features/auth/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("請輸入帳號密碼");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email, password);
      await new Promise((r) => setTimeout(r, 300));
      router.replace("/admin/inventories");
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-[20vh] flex flex-col items-center space-y-4">
        {error && (
          <div className="w-full rounded-md border border-red-400 bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email">email:</label>
          <input
            id="email"
            className="rounded-md border-2 p-2"
            placeholder="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password">password:</label>
          <input
            id="password"
            className="rounded-md border-2 p-2"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleLogin} disabled={loading || !email || !password}>
          {loading ? (
            <>
              <Spinner />
              登入中...
            </>
          ) : (
            "登入"
          )}
        </Button>
      </div>
    </>
  );
}
