import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoryModel } from "@/models/category.model";
import { CategoryResolver } from "@/resolvers/category.resolver";
import { CategoryService } from "@/services/category.service";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel])],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
