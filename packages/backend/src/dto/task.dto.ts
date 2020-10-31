import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class TaskDTO {
  @Field((type) => ID, { nullable: true })
  id?: number;

  @Field()
  title: string;
}
