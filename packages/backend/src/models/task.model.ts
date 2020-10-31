import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { TaskContentModel } from "./taskContent.model";

@ObjectType()
@Entity("tasks")
export class TaskModel {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => [TaskContentModel], { defaultValue: [] })
  @OneToMany((type) => TaskContentModel, (taskContent) => taskContent.task)
  taskContents: TaskContentModel[];
}
