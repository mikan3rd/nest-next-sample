import { Field, InputType, Int } from "@nestjs/graphql";

import { Color } from "@/models/category.model";

@InputType()
export class AddCategoryInput {
  @Field()
  name!: string;

  @Field((type) => Color)
  color!: Color;
}

@InputType()
export class UpdateCategoryInput {
  @Field((type) => Int)
  id!: number;

  @Field()
  name?: string;

  @Field((type) => Color)
  color?: Color;
}
