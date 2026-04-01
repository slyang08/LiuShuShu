// apps/web/src/app/admin/(protected)/varieties/page.tsx
import VarietyManager from "@/features/variety/components/VarietyManager";

export default async function VarietiesPage() {
  return (
    <div className="space-y-4 px-4">
      <h1>榴蓮品種 Durian Varieties</h1>

      <VarietyManager />
    </div>
  );
}
