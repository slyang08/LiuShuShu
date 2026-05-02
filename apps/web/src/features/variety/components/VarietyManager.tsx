// apps/web/src/features/variety/components/VarietyManager.tsx
"use client";

import { useEffect, useState } from "react";

import { DurianVariety } from "@liushushu/shared";

import { createVariety, deleteVariety, getVarieties, updateVariety } from "../api";
import VarietyForm from "./VarietyForm";
import VarietyList from "./VarietyList";

export default function VarietyManager() {
  const [varieties, setVarieties] = useState<DurianVariety[]>([]);
  const [editing, setEditing] = useState<DurianVariety | null>(null);

  useEffect(() => {
    getVarieties().then(setVarieties).catch(console.error);
  }, []);

  const handleCreate = async (data: { name: string; desc?: string }) => {
    const created = await createVariety(data);
    setVarieties((prev) => [created, ...prev]);
  };

  const handleUpdate = async (id: number, data: { name: string; desc?: string }) => {
    const updateData = {
      name: data.name,
      desc: data.desc || "",
    };

    const updated = await updateVariety(id, updateData);
    setVarieties((prev) => prev.map((v) => (v.id === id ? updated : v)));
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    await deleteVariety(id);
    setVarieties((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <VarietyForm
        key={editing?.id ?? "create"} // Reset the form when switching to edit mode
        initialValue={editing}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
      <VarietyList
        varieties={varieties}
        onEdit={setEditing}
        onDelete={(id) => {
          void handleDelete(id);
        }}
      />
    </div>
  );
}
