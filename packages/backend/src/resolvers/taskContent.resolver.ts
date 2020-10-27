import { Inject } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";

import { TaskContentDTO } from "../dto/taskContent.dto";
import { TaskContentModel } from "../models/taskContent.model";
import { TaskContentService } from "../services/taskContent.service";

@Resolver((of) => TaskContentModel)
export class TaskContentResolver {
  constructor(@Inject(TaskContentService) private taskContentService: TaskContentService) {}

  @Query((returns) => TaskContentModel, { nullable: true })
  async taskContent(@Args("id", { type: () => ID }) id: number) {
    return await this.taskContentService.findOne(id);
  }

  @Query((returns) => [TaskContentModel])
  async taskContents() {
    return await this.taskContentService.findAll();
  }

  @Mutation((returns) => TaskContentModel)
  async saveTaskContent(@Args("taskContent") taskContent: TaskContentDTO) {
    return await this.taskContentService.save(taskContent);
  }

  @Mutation((returns) => TaskContentModel, { nullable: true })
  async deleteTaskContent(@Args("id", { type: () => ID }) id: number) {
    return await this.taskContentService.delete(id);
  }
}
