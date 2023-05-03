import { ICategoriesRepository } from "../interfaces/categoriesRepository.interface";
import { ICategoryDTO } from "../dtos/category.dtos";

import { Category } from "../../infra/database/entities/category.entity";
import { AppError } from "../errors/app.error";

class CategoriesServices {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async findAll(): Promise<Category[]> {
    return (await this.categoriesRepository.findAll()) ?? [];
  }

  async create(categoryDTO: ICategoryDTO): Promise<void> {
    const category = await this.categoriesRepository.findOneByName(
      categoryDTO.name
    );

    if (category) {
      throw new AppError("Category already exists", 404);
    }

    await this.categoriesRepository.create(categoryDTO);
  }

  async delete(id: string): Promise<void> {
    const category = await this.categoriesRepository.findOneById(id);

    if (!category) {
      throw new AppError("Category does not exist", 404);
    }

    await this.categoriesRepository.delete(id);
  }
}

export { CategoriesServices };
