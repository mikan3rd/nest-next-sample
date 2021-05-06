import { Field, ID, ObjectType } from "@nestjs/graphql";

import { TaskModel } from "@/models/task.model";

@ObjectType()
export class TaskContentModel {
  @Field((type) => ID)
  id: number;

  @Field()
  checked: boolean;

  @Field()
  title: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => TaskModel)
  task: TaskModel;
}
