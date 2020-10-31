import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class TaskContentDTO {
  @Field((type) => ID, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  checked?: boolean;

  @Field()
  title?: string;

  @Field((type) => ID, { nullable: true })
  taskId?: number;
}
