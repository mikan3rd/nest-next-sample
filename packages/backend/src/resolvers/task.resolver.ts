import { Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { TaskDTO } from "../dto/task.dto";
import { TaskModel } from "../models/task.model";
import { TaskService } from "../services/task.service";

@Resolver((of) => TaskModel)
export class TaskResolver {
  constructor(@Inject(TaskService) private TaskService: TaskService) {}

  @Query((returns) => TaskModel, { nullable: true })
  async task(@Args("id") id: number) {
    return await this.TaskService.findOne(id);
  }

  @Query((returns) => [TaskModel])
  async accounts() {
    return await this.TaskService.findAll();
  }

  @Mutation((returns) => TaskModel)
  async saveAccount(@Args("task") task: TaskDTO) {
    return await this.TaskService.save(task);
  }

  @Mutation((returns) => TaskModel, { nullable: true })
  async deleteYoutubeChannel(@Args("id") id: number) {
    return await this.TaskService.delete(id);
  }
}
