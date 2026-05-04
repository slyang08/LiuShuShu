// apps/api-nest/src/variety/variety.service.ts
import { Injectable } from "@nestjs/common";

import { CreateDurianVarietyDTO, UpdateDurianVarietyDTO, DurianVariety } from "@liushushu/shared";

import { PrismaService } from "../prisma/prisma.service";

type PrismaVariety = Awaited<ReturnType<PrismaService["db"]["durianVariety"]["findUnique"]>>;

@Injectable()
export class VarietyService {
  constructor(private prisma: PrismaService) {}

  private toDomain(data: PrismaVariety): DurianVariety {
    if (!data) throw new Error("Invalid variety");

    return {
      id: data.id,
      name: data.name,
      desc: data.desc ?? undefined,
      isActive: data.isActive,
    };
  }

  async getAll(): Promise<DurianVariety[]> {
    const result = await this.prisma.db.durianVariety.findMany();
    return result.map((x) => this.toDomain(x));
  }

  async getById(id: number): Promise<DurianVariety | null> {
    const result = await this.prisma.db.durianVariety.findUnique({
      where: { id },
    });

    return result ? this.toDomain(result) : null;
  }

  async create(dto: CreateDurianVarietyDTO): Promise<DurianVariety> {
    const result = await this.prisma.db.durianVariety.create({
      data: dto,
    });

    return this.toDomain(result);
  }

  async update(id: number, dto: UpdateDurianVarietyDTO): Promise<DurianVariety> {
    const result = await this.prisma.db.durianVariety.update({
      where: { id },
      data: dto,
    });

    return this.toDomain(result);
  }

  async softDelete(id: number): Promise<DurianVariety> {
    const result = await this.prisma.db.durianVariety.update({
      where: { id },
      data: { isActive: false },
    });

    return this.toDomain(result);
  }
}
