import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CategoryModel } from "@/models/category.model";
import { TaskContentModel } from "@/models/taskContent.model";

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

  @Field((type) => [CategoryModel], { defaultValue: [] })
  @ManyToMany((type) => CategoryModel, (category) => category.tasks)
  @JoinTable({
    name: "tasks_categories",
    joinColumn: {
      name: "task_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "id",
    },
  })
  categories: CategoryModel[];
}
