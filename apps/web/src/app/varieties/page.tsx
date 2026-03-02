import { getVarieties } from "@/features/variety/api";
import VarietyForm from "@/features/variety/components/VarietyForm";
import VarietyList from "@/features/variety/components/VarietyList";

export default async function VarietiesPage() {
  const varieties = await getVarieties();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Durian Varieties</h1>

      <VarietyForm />

      <VarietyList varieties={varieties} />
    </div>
  );
}
