import { Field, InputType } from "@nestjs/graphql";

import { Color } from "../models/category.model";

@InputType()
export class AddCategoryInput {
  @Field()
  name: string;

  @Field()
  color: Color;
}
