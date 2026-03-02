"use client";

import { useState } from "react";
import { createVariety } from "../api";

export default function VarietyForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);

      await createVariety({ name, desc });

      setName("");
      setDesc("");

      window.location.reload();
    } catch (error) {
      alert("Failed to create variety");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <input
          placeholder="Variety Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Variety"}
      </button>
    </form>
  );
}
