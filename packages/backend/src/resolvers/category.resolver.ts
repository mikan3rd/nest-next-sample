import { Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

import { AddCategoryInput } from "@/dto/category.dto";
import { CategoryModel } from "@/models/category.model";
import { CategoryService } from "@/services/category.service";

@Resolver()
export class CategoryResolver {
  constructor(@Inject(CategoryService) private taskService: CategoryService) {}

  @Query((returns) => CategoryModel, { nullable: true })
  async category(@Args("id", { type: () => Int }) id: number) {
    return await this.taskService.findOne(id);
  }

  @Query((returns) => [CategoryModel])
  async categories() {
    return await this.taskService.findAll();
  }

  @Mutation((returns) => CategoryModel)
  async saveCategory(@Args("category") category: AddCategoryInput) {
    return await this.taskService.save(category);
  }

  @Mutation((returns) => CategoryModel, { nullable: true })
  async deleteCategory(@Args("id", { type: () => Int }) id: number) {
    return await this.taskService.delete(id);
  }
}
