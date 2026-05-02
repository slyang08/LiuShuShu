// apps/web/src/features/variety/components/VarietyList.tsx
import { Pencil, Trash2 } from "lucide-react";

import { DurianVariety } from "@liushushu/shared";

import { Button } from "@/components/ui/button";

interface Props {
  varieties: DurianVariety[];
  onEdit: (v: DurianVariety) => void;
  onDelete: (id: number) => void;
}

export default function VarietyList({ varieties, onEdit, onDelete }: Props) {
  if (!varieties.length) return <p className="text-gray-500">No varieties yet.</p>;

  return (
    <ul className="space-y-2">
      {varieties.map((variety) => (
        <li key={variety.id} className="">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <strong>{variety.name}</strong>
              <div className="flex flex-row">
                <Button
                  onClick={() => onEdit(variety)}
                  className="h-6 cursor-pointer text-sm text-blue-600"
                >
                  <Pencil />
                </Button>
                <Button
                  onClick={() => onDelete(variety.id)}
                  className="h-6 cursor-pointer text-sm text-red-600"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
            {variety.desc || "No description"}
          </div>
        </li>
      ))}
    </ul>
  );
}
