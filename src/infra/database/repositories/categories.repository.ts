import { Repository } from "typeorm";

import { ICategoriesRepository } from "../../../core/interfaces/categoriesRepository.interface";
import { ICategoryDTO } from "../../../core/dtos/category.dto";

import { appDataSource } from "..";

import { Category } from "../entities/category.entity";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  async findOneById(id: string): Promise<Category | undefined> {
    const category = await this.repository.findOneBy({ id });
    return category !== null ? category : undefined;
  }

  async findOneByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOneBy({ name });
    return category !== null ? category : undefined;
  }

  async findAll(): Promise<Category[] | undefined> {
    return await this.repository.find();
  }

  async create(categoryDTO: ICategoryDTO): Promise<void> {
    const category = this.repository.create(categoryDTO);
    await this.repository.save(category);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { CategoriesRepository };
