// apps/web/src/app/admin/(protected)/change-password/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { changePassword } from "@/features/auth/api";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);

  const logout = useLogout();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await changePassword(current, next);
      alert("Password updated");
      await logout();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-[20vh] flex flex-col items-center space-y-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            id="currentPassword"
            className="rounded-md border-2 p-2"
            placeholder="Current password"
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="newPassword"
            className="rounded-md border-2 p-2"
            placeholder="New password"
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading || !current || !next}>
          {loading ? (
            <>
              <span className="mr-2">🔄</span>
              更改中...
            </>
          ) : (
            "更改密碼"
          )}
        </Button>
      </div>
    </>
  );
}
