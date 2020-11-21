import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AddCategoryInput } from "@/dto/category.dto";
import { CategoryModel } from "@/models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>,
  ) {}

  async findOne(id: number) {
    return this.categoryRepository.findOne(id, { relations: ["tasks"] });
  }

  async findAll() {
    return this.categoryRepository.find({ relations: ["tasks"] });
  }

  async findByIds(ids: number[]) {
    return this.categoryRepository.findByIds(ids);
  }

  async save(payload: AddCategoryInput) {
    return this.categoryRepository.save({ ...payload });
  }

  async delete(id: number) {
    await this.categoryRepository.delete(id);
    return await this.findOne(id);
  }
}
