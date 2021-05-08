import { Injectable } from "@nestjs/common";

import { AddTaskInput } from "@/dto/task.dto";
import { PrismaService } from "@/services/prisma.service";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return await this.prisma.task.findUnique({
      where: { id },
      include: {
        taskContents: true,
        taskCategoryRelation: {
          include: { category: true },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.task.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        taskContents: true,
        taskCategoryRelation: {
          include: { category: true },
        },
      },
    });
  }

  async save({ categoryIds, ...payload }: AddTaskInput) {
    return await this.prisma.task.create({
      data: {
        ...payload,
        taskCategoryRelation: {
          createMany: { data: categoryIds.map((categoryId) => ({ categoryId })) },
        },
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
