import { Field, ID, ObjectType } from "@nestjs/graphql";

import { CategoryModel } from "@/models/category.model";
import { TaskContentModel } from "@/models/taskContent.model";

@ObjectType()
export class TaskModel {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => [TaskContentModel], { defaultValue: [] })
  taskContents: TaskContentModel[];

  @Field((type) => [CategoryModel], { defaultValue: [] })
  categories: CategoryModel[];
}
