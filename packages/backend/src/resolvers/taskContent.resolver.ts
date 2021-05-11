import { Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

import { AddTaskContentInput, UpdateTaskContentInput } from "@/dto/taskContent.dto";
import { TaskContentModel } from "@/models/taskContent.model";
import { TaskContentService } from "@/services/taskContent.service";

@Resolver()
export class TaskContentResolver {
  constructor(@Inject(TaskContentService) private taskContentService: TaskContentService) {}

  @Query((returns) => TaskContentModel, { nullable: true })
  async taskContent(@Args("id", { type: () => Int }) id: number) {
    return await this.taskContentService.findOne(id);
  }

  @Query((returns) => [TaskContentModel])
  async taskContents() {
    return await this.taskContentService.findAll();
  }

  @Mutation((returns) => TaskContentModel)
  async saveTaskContent(@Args("taskContent") taskContent: AddTaskContentInput) {
    return await this.taskContentService.save(taskContent);
  }

  @Mutation((returns) => TaskContentModel)
  async updateTaskContent(@Args("taskContent") taskContent: UpdateTaskContentInput) {
    return await this.taskContentService.update(taskContent);
  }

  @Mutation((returns) => TaskContentModel, { nullable: true })
  async deleteTaskContent(@Args("id", { type: () => Int }) id: number) {
    return await this.taskContentService.delete(id);
  }
}
