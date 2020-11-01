import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { TaskModel } from "./task.model";

export enum Color {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
}

@ObjectType()
@Entity("categories")
export class CategoryModel {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
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
