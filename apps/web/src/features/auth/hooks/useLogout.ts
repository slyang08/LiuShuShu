// apps/web/src/features/auth/hooks/useLogout.ts
import { useRouter } from "next/navigation";
import { logout } from "../api";

export function useLogout() {
  const router = useRouter();

  return async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    } finally {
      router.replace("/admin/login");
    }
  };
}
