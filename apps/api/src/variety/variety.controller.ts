// apps/api-nest/src/variety/variety.controller.ts
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

import { VarietyService } from "./variety.service";

@Controller("admin/varieties")
export class VarietyController {
  constructor(private readonly varietyService: VarietyService) {}

  @Get()
  async getAll() {
    return this.varietyService.getAll();
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number) {
    return this.varietyService.getById(id);
  }

  @Post()
  async create(@Body() body: { name: string; desc?: string }) {
    if (!body.name) {
      throw new Error("Name is required"); // later should be BadRequestException
    }

    return this.varietyService.create(body);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: { name?: string; desc?: string }
  ) {
    return this.varietyService.update(id, body);
  }

  @Delete(":id")
  async softDelete(@Param("id", ParseIntPipe) id: number) {
    return this.varietyService.softDelete(id);
  }
}
