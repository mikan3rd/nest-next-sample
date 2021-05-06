import { Injectable } from "@nestjs/common";

import { AddCategoryInput } from "@/dto/category.dto";
import { PrismaService } from "@/services/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      include: {
        taskCategoryRelation: { include: { task: true } },
      },
    });
  }

  async findByIds(ids: number[]) {
    return await this.prisma.category.findMany({ where: { id: { in: ids } } });
  }

  async save(payload: AddCategoryInput) {
    return await this.prisma.category.create({ data: payload });
  }

  async delete(id: number) {
    return await this.prisma.category.delete({ where: { id } });
  }
}
