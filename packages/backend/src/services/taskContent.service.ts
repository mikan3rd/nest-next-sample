import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TaskContentDTO } from "../dto/taskContent.dto";
import { TaskContentModel } from "../models/taskContent.model";

import { TaskService } from "./task.service";

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

  async save(payload: TaskContentDTO) {
    const task = await this.taskService.findOne(payload.taskId);
    return this.taskContentRepository.save({ ...payload, task });
  }

  async delete(id: number) {
    const target = await this.findOne(id);
    await this.taskContentRepository.delete(id);
    return target;
  }
}
