import { Repository } from "typeorm";

import { ICategoriesRepository } from "../../interfaces/categoriesRepository.interface";

import {
  ICreateCategoryDTO,
  IUpdateCategoryDTO,
} from "../../dtos/category.dtos";

import { appDataSource } from "..";

import { Category } from "../entities/category.entity";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  async findOneById(id: string): Promise<Category | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Category | null> {
    return await this.repository.findOneBy({ name });
  }

  async find(skip?: number, take?: number): Promise<Category[] | null> {
    return await this.repository.find({
      skip,
      take,
    });
  }

  async create(categoryDTO: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create(categoryDTO);
    await this.repository.save(category);
  }

  async update(
    category: Category,
    categoryDTO: IUpdateCategoryDTO
  ): Promise<void> {
    this.repository.merge(category, categoryDTO);

    await this.repository.save(category);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { CategoriesRepository };
