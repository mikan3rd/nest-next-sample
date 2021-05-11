import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddTaskContentInput {
  @Field()
  title!: string;

  @Field((type) => Int)
  taskId!: number;
}

@InputType()
export class UpdateTaskContentInput {
  @Field((type) => Int)
  id!: number;

  @Field({ nullable: true })
  checked?: boolean;

  @Field({ nullable: true })
  title?: string;
}
