import { Field, Int, ObjectType } from "@nestjs/graphql";

import { TaskModel } from "@/models/task.model";

@ObjectType()
export class TaskContentModel {
  @Field((type) => Int)
  id!: number;

  @Field()
  checked!: boolean;

  @Field()
  title!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field((type) => TaskModel)
  task!: TaskModel;
}
