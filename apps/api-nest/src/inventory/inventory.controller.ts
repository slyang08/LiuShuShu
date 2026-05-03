// apps/api-nest/src/inventory/inventory.controller.ts
import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";

import { CreateInventoryDTO } from "@liushushu/shared";

import { InventoryService } from "./inventory.service";
import { GetUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("admin/inventories")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @GetUser() user: { storeId: number },
    @Body() dto: CreateInventoryDTO
  ): Promise<unknown> {
    return this.inventoryService.create(user.storeId, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@GetUser() user: { storeId: number }): Promise<unknown> {
    return this.inventoryService.findAll(user.storeId);
  }

  @Get("today")
  @UseGuards(JwtAuthGuard)
  async findToday(@GetUser() user: { storeId: number }): Promise<unknown> {
    return this.inventoryService.findToday(user.storeId);
  }

  @Get(":date")
  @UseGuards(JwtAuthGuard)
  async findByDate(
    @GetUser() user: { storeId: number },
    @Param("date") date: string
  ): Promise<unknown> {
    return this.inventoryService.findByDate(user.storeId, date);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @GetUser() user: { storeId: number },
    @Body() dto: CreateInventoryDTO
  ): Promise<unknown> {
    return this.inventoryService.update(user.storeId, dto);
  }
}
