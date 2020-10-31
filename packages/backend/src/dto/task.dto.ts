import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class AddTaskInput {
  @Field()
  title: string;
}
