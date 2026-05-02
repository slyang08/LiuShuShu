// packages/src/variety/dto.ts
export interface CreateDurianVarietyDTO {
  name: string;
  desc?: string;
}

export interface UpdateDurianVarietyDTO {
  name?: string;
  desc?: string;
}
