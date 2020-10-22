import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskModel } from "../models/task.model";
import { TaskResolver } from "../resolvers/task.resolver";
import { TaskService } from "../services/task.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel])],
  providers: [TaskService, TaskResolver],
  exports: [TaskService],
})
export class TaskModule {}
