// apps/web/src/app/admin/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/features/auth/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      router.replace("/admin/inventories");
      router.refresh();
    } catch (err) {
      alert((err as Error).message);
      return;
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
        <Button onClick={handleLogin} disabled={loading || !email || !password}>
          {loading ? (
            <>
              <span className="mr-2">🔄</span>
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
