import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { TaskModel } from "@/models/task.model";

export enum Color {
  red = "red",
  blue = "blue",
  green = "green",
}

registerEnumType(Color, { name: "Color" });

@ObjectType()
@Entity("categories")
export class CategoryModel {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => Color)
  @Column({ type: "enum", enum: Color })
  color: Color;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => TaskModel, { defaultValue: [] })
  @ManyToMany((type) => TaskModel, (task) => task.categories)
  tasks: TaskModel[];
}
