import { Module, forwardRef } from "@nestjs/common";

import { TaskModule } from "@/modules/task.module";
import { TaskContentResolver } from "@/resolvers/taskContent.resolver";
import { PrismaService } from "@/services/prisma.service";
import { TaskContentService } from "@/services/taskContent.service";

@Module({
  imports: [forwardRef(() => TaskModule)],
  providers: [TaskContentService, TaskContentResolver, PrismaService],
  exports: [TaskContentService],
})
export class TaskContentModule {}
