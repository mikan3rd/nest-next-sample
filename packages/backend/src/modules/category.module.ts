import { Module } from "@nestjs/common";

import { CategoryResolver } from "@/resolvers/category.resolver";
import { CategoryService } from "@/services/category.service";
import { PrismaService } from "@/services/prisma.service";

@Module({
  imports: [],
  providers: [CategoryService, CategoryResolver, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule {}
