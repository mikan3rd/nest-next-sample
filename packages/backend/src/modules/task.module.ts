import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskModel } from "../models/task.model";
import { TaskResolver } from "../resolvers/task.resolver";
import { TaskService } from "../services/task.service";

import { CategoryModule } from "./category.module";

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel]), forwardRef(() => CategoryModule)],
  providers: [TaskService, TaskResolver],
  exports: [TaskService],
})
export class TaskModule {}
