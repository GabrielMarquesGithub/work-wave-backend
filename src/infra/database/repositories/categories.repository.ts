import { Repository } from "typeorm";

import { ICategoriesRepository } from "../../../core/interfaces/categoriesRepository.interface";
import {
  ICreateCategoryDTO,
  IResponseCategoryDTO,
  IUpdateCategoryDTO,
} from "../../../core/dtos/category.dtos";

import { appDataSource } from "..";

import { Category } from "../entities/category.entity";
import { categorySelect } from "../selects/category.select";
import { serviceSelect } from "../selects/service.select";
import { serviceImageSelect } from "../selects/serviceImage.select";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  async findOneById(id: string): Promise<Category | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByIdWithServicesAndServicesImages(
    id: string,
    skip: number,
    limit: number
  ): Promise<Category | null> {
    return await this.repository.findOne({
      where: { id },
      select: {
        ...categorySelect,
        services: { ...serviceSelect, images: serviceImageSelect },
      },
      relations: { services: { images: true } },
    });
  }

  async findOneByName(name: string): Promise<Category | null> {
    return await this.repository.findOneBy({ name });
  }

  async findAll(): Promise<IResponseCategoryDTO[] | null> {
    return await this.repository.find({ select: categorySelect });
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
