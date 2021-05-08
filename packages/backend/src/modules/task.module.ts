import { Module, forwardRef } from "@nestjs/common";

import { CategoryModule } from "@/modules/category.module";
import { TaskResolver } from "@/resolvers/task.resolver";
import { PrismaService } from "@/services/prisma.service";
import { TaskService } from "@/services/task.service";

@Module({
  imports: [forwardRef(() => CategoryModule)],
  providers: [TaskService, TaskResolver, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}
