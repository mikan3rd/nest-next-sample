import { Field, Int, ObjectType } from "@nestjs/graphql";

import { CategoryModel } from "@/models/category.model";
import { TaskModel } from "@/models/task.model";

@ObjectType()
export class TaskCategoryRelation {
  @Field((type) => Int)
  taskId!: number;

  @Field((type) => Int)
  categoryId!: number;

  @Field((type) => TaskModel)
  task!: TaskModel;

  @Field((type) => CategoryModel)
  category!: CategoryModel;
}
