import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AddTaskContentInput, UpdateTaskContentInput } from "@/dto/taskContent.dto";
import { TaskContentModel } from "@/models/taskContent.model";
import { TaskService } from "@/services/task.service";

@Injectable()
export class TaskContentService {
  constructor(
    @InjectRepository(TaskContentModel)
    private taskContentRepository: Repository<TaskContentModel>,
    private taskService: TaskService,
  ) {}

  async findOne(id: number) {
    return this.taskContentRepository.findOne(id, { relations: ["task"] });
  }

  async findAll() {
    return this.taskContentRepository.find({ relations: ["task"] });
  }

  async save(payload: AddTaskContentInput) {
    const task = await this.taskService.findOne(payload.taskId);
    return this.taskContentRepository.save({ ...payload, task });
  }

  async update({ id, ...params }: UpdateTaskContentInput) {
    this.taskContentRepository.update(id, { ...params });
    return await this.findOne(id);
  }

  async delete(id: number) {
    await this.taskContentRepository.delete(id);
    return this.findOne(id);
  }
}
