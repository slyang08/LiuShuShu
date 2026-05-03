// apps/api-nest/src/store/store.controller.ts
// store.controller.ts
import { Body, Controller, Get, Post } from "@nestjs/common";

import { StoreService } from "./store.service";

@Controller("admin/stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(@Body() body: { name: string }): Promise<unknown> {
    return this.storeService.create(body.name);
  }

  @Get()
  async findAll(): Promise<unknown> {
    return this.storeService.findAll();
  }
}
