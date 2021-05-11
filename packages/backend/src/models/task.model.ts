import { Field, Int, ObjectType } from "@nestjs/graphql";

import { TaskCategoryRelation } from "@/models/taskCategoryRelation.model";
import { TaskContentModel } from "@/models/taskContent.model";

@ObjectType()
export class TaskModel {
  @Field((type) => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field((type) => [TaskContentModel])
  taskContents!: TaskContentModel[];

  @Field((type) => [TaskCategoryRelation])
  taskCategoryRelation!: TaskCategoryRelation[];
}
