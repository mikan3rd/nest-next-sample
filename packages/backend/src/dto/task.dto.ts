import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TaskDTO {
  @Field({ nullable: true })
  id?: number;

  @Field()
  title: string;
}
