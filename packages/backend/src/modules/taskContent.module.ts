import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskContentModel } from "@/models/taskContent.model";
import { TaskModule } from "@/modules/task.module";
import { TaskContentResolver } from "@/resolvers/taskContent.resolver";
import { TaskContentService } from "@/services/taskContent.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskContentModel]), forwardRef(() => TaskModule)],
  providers: [TaskContentService, TaskContentResolver],
  exports: [TaskContentService],
})
export class TaskContentModule {}
