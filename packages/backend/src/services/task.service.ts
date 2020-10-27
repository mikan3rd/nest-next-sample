import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TaskDTO } from "../dto/task.dto";
import { TaskModel } from "../models/task.model";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskModel)
    private taskRepository: Repository<TaskModel>,
  ) {}

  async findOne(id: number) {
    return this.taskRepository.findOne(id, { relations: ["taskContents"] });
  }

  async findAll() {
    return this.taskRepository.find({ relations: ["taskContents"] });
  }

  async save(payload: TaskDTO) {
    return this.taskRepository.save({ ...payload });
  }

  async delete(id: number) {
    const target = await this.findOne(id);
    await this.taskRepository.delete(id);
    return target;
  }
}
