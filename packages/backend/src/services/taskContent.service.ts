import { Injectable } from "@nestjs/common";

import { AddTaskContentInput, UpdateTaskContentInput } from "@/dto/taskContent.dto";
import { PrismaService } from "@/services/prisma.service";
import { TaskService } from "@/services/task.service";

@Injectable()
export class TaskContentService {
  constructor(private taskService: TaskService, private prisma: PrismaService) {}

  async findOne(id: number) {
    return await this.prisma.taskContent.findUnique({ where: { id }, include: { task: true } });
  }

  async findAll() {
    return await this.prisma.taskContent.findMany({ include: { task: true } });
  }

  async save({ taskId, ...payload }: AddTaskContentInput) {
    return await this.prisma.taskContent.create({
      data: {
        ...payload,
        task: { connect: { id: taskId } },
      },
    });
  }

  async update({ id, ...data }: UpdateTaskContentInput) {
    return await this.prisma.taskContent.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.taskContent.delete({ where: { id } });
  }
}
