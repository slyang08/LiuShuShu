// apps/web/src/features/variety/components/VarietyList.tsx
import { Variety } from "../types";

interface Props {
  varieties: Variety[];
  onEdit: (v: Variety) => void;
  onDelete: (id: number) => void;
}

export default function VarietyList({ varieties, onEdit, onDelete }: Props) {
  if (!varieties.length) return <p className="text-gray-500">No varieties yet.</p>;

  return (
    <ul className="space-y-2">
      {varieties.map((variety) => (
        <li key={variety.id} className="flex items-center gap-2">
          <div className="flex-1">
            <strong>{variety.name}</strong> - {variety.desc || "No description"}
          </div>
          <button onClick={() => onEdit(variety)} className="cursor-pointer text-sm text-blue-600">
            編輯 Edit
          </button>
          <button
            onClick={() => onDelete(variety.id)}
            className="cursor-pointer text-sm text-red-600"
          >
            刪除 Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
