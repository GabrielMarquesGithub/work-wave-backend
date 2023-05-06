import { ICategoriesRepository } from "../../core/interfaces/categoriesRepository.interface";
import {
  ICreateCategoryDTO,
  IResponseCategoryDTO,
} from "../../core/dtos/category.dtos";

import { AppError } from "../../core/errors/app.error";
import { IStorageProvider } from "../../core/interfaces/storageProvider.interface";
import { CategoryMapper } from "../server/mappers/category.mapper";

class CategoriesServices {
  private categoriesRepository: ICategoriesRepository;
  private storageProvider: IStorageProvider;

  constructor(
    categoriesRepository: ICategoriesRepository,
    storageProvider: IStorageProvider
  ) {
    this.categoriesRepository = categoriesRepository;
    this.storageProvider = storageProvider;
  }

  async findAll(): Promise<IResponseCategoryDTO[]> {
    const categories = (await this.categoriesRepository.findAll()) ?? [];
    return categories.map((category) => CategoryMapper.toDTO(category));
  }

  async create(categoryDTO: ICreateCategoryDTO): Promise<void> {
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

  async createIcon(id: string, file: string): Promise<void> {
    const category = await this.categoriesRepository.findOneById(id);

    if (!category) {
      throw new AppError("Category does not exist", 404);
    }

    if (!file) {
      throw new AppError("Image does not exist", 404);
    }

    if (category.icon_url) {
      this.storageProvider.delete(category.icon_url, "icon");
    }

    await this.storageProvider.save(file, "icon");

    await this.categoriesRepository.update(category, {
      ...category,
      icon_url: file,
    });
  }
}

export { CategoriesServices };
