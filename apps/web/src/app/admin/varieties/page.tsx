import VarietyManager from "@/features/variety/components/VarietyManager";

export default async function VarietiesPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>榴蓮品種 Durian Varieties</h1>

      <VarietyManager />
    </div>
  );
}
