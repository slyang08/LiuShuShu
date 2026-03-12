// apps/web/src/features/variety/components/VarietyForm.tsx
"use client";

import { useState } from "react";

import type { Variety } from "../types";

interface Props {
  initialValue?: Variety | null;
  onCreate: (data: { name: string; desc?: string }) => Promise<void>;
  onUpdate: (id: number, data: { name: string; desc?: string }) => Promise<void>;
}

export default function VarietyForm({ initialValue, onCreate, onUpdate }: Props) {
  const [name, setName] = useState(initialValue?.name ?? "");
  const [desc, setDesc] = useState(initialValue?.desc ?? "");
  const [loading, setLoading] = useState(false);

  const editing = Boolean(initialValue?.id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);
      if (editing && initialValue) {
        await onUpdate(initialValue.id, { name, desc });
      } else {
        await onCreate({ name, desc });

        setName("");
        setDesc("");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create variety");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <input
          placeholder="品種名稱 Variety Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="描述 Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading} className="cursor-pointer">
        {loading ? "增加中 (Adding)" : editing ? "更新品種 Update Variety" : "新增品種 Add Variety"}
      </button>
    </form>
  );
}
