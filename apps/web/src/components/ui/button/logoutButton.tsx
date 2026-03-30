// apps/web/src/components/ui/button/logoutButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/api";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton({
  onSuccess,
  className = "",
}: {
  onSuccess?: () => void;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await logout();
        onSuccess?.();
        router.replace("/admin/login");
        router.refresh();
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
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
