import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TaskContentDTO {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  checked?: boolean;

  @Field()
  title?: string;

  @Field()
  taskId?: number;
}
