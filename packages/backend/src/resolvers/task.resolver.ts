import { Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

import { AddTaskInput } from "@/dto/task.dto";
import { TaskModel } from "@/models/task.model";
import { TaskService } from "@/services/task.service";

@Resolver()
export class TaskResolver {
  constructor(@Inject(TaskService) private taskService: TaskService) {}

  @Query((returns) => TaskModel, { nullable: true })
  async task(@Args("id", { type: () => Int }) id: number) {
    return await this.taskService.findOne(id);
  }

  @Query((returns) => [TaskModel])
  async tasks() {
    return await this.taskService.findAll();
  }

  @Mutation((returns) => TaskModel)
  async saveTask(@Args("task") task: AddTaskInput) {
    return await this.taskService.save(task);
  }

  @Mutation((returns) => TaskModel, { nullable: true })
  async deleteTask(@Args("id", { type: () => Int }) id: number) {
    return await this.taskService.delete(id);
  }
}
