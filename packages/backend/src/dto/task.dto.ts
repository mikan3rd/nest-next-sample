import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddTaskInput {
  @Field()
  title!: string;

  @Field((type) => [Int])
  categoryIds!: number[];
}
