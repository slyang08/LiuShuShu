// apps/web/src/components/ui/button/logoutButton.tsx
"use client";

import { useTransition } from "react";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function LogoutButton({ className = "" }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const logout = useLogout();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => startTransition(logout)}
      disabled={isPending}
      className={className}
    >
      {isPending ? (
        <>
          <div className="border-primary/40 border-t-primary h-4 w-4 animate-spin rounded-full border" />
          <span className="sr-only">登出中...</span>
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          登出
        </>
      )}
    </Button>
  );
}
