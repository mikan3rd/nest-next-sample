import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AddTaskInput } from "../dto/task.dto";

import { CategoryService } from "./category.service";

import { TaskModel } from "@/models/task.model";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskModel)
    private taskRepository: Repository<TaskModel>,
    private categoryService: CategoryService,
  ) {}

  async findOne(id: number) {
    return this.taskRepository.findOne(id, { relations: ["taskContents", "categories"] });
  }

  async findAll() {
    return this.taskRepository.find({ order: { createdAt: "ASC" }, relations: ["taskContents", "categories"] });
  }

  async save({ categoryIds, ...payload }: AddTaskInput) {
    const categories = await this.categoryService.findByIds(categoryIds);
    return await this.taskRepository.save({ ...payload, categories });
  }

  async delete(id: number) {
    await this.taskRepository.delete(id);
    return await this.findOne(id);
  }
}
