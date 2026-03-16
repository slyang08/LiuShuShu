// packages/shared/src/inventory/dto.ts
export interface CreateInventoryItemDTO {
  varietyId: number;
  quantity: number;
  price: number; // Frontend uses number, backend converts to Decimal
}

export interface CreateInventoryDTO {
  storeId: number;
  date: string; // YYYY-MM-DD
  items: CreateInventoryItemDTO[];
}
