// apps/web/src/features/variety/components/VarietyList.tsx
import { Variety } from "../types";

interface Props {
  varieties: Variety[];
}

const VarietyItem = ({ variety }: { variety: Variety }) => (
  <li className="py-1">
    <strong>{variety.name}</strong> - {variety.desc || "No description"}
  </li>
);

export default function VarietyList({ varieties }: Props) {
  if (!varieties.length) return <p className="text-gray-500">No varieties yet.</p>;

  return <ul className="space-y-2">{varieties.map((v) => <VarietyItem key={v.id} variety={v} />)}</ul>;
}
