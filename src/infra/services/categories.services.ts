import { ICategoriesRepository } from "../../core/interfaces/categoriesRepository.interface";
import {
  ICreateCategoryDTO,
  IResponseCategoryDTO,
  IUpdateCategoryDTO,
} from "../../core/dtos/category.dtos";

import { AppError } from "../../core/errors/app.error";
import { IStorageProvider } from "../../core/interfaces/storageProvider.interface";
import { Category } from "../database/entities/category.entity";
import { appUrl } from "../configs/upload";

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

  async checkIfCategoryExists(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOneById(id);

    if (!category) {
      throw new AppError("Category does not exist", 404);
    }

    return category;
  }

  async findAll(): Promise<IResponseCategoryDTO[]> {
    return (await this.categoriesRepository.findAll()) ?? [];
  }

  async findOneByIdWithServicesAndServicesImages(
    id: string
  ): Promise<IResponseCategoryDTO> {
    const category =
      await this.categoriesRepository.findOneByIdWithServicesAndServicesImages(
        id,
        0,
        30
      );

    if (!category) {
      throw new AppError("Category does not exist", 404);
    }

    return category;
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
    await this.checkIfCategoryExists(id);

    await this.categoriesRepository.delete(id);
  }

  async createIcon(id: string, file: string): Promise<void> {
    const category = await this.checkIfCategoryExists(id);

    if (!file) {
      throw new AppError("Image does not exist", 404);
    }

    if (category.icon) {
      this.storageProvider.delete(category.icon, "icon");
    }

    await this.storageProvider.save(file, "icon");

    const newCategory: IUpdateCategoryDTO = {
      ...category,
      icon: file,
      icon_url: `${appUrl}icon/${file}`,
    };

    await this.categoriesRepository.update(category, newCategory);
  }

  async deleteIcon(id: string): Promise<void> {
    const category = await this.checkIfCategoryExists(id);

    if (!category.icon_url || !category.icon) {
      throw new AppError("Image does not exist", 404);
    }

    this.storageProvider.delete(category.icon, "icon");

    // Excluindo a URL e o caminho do arquivo
    category.icon = null;
    category.icon_url = null;

    await this.categoriesRepository.update(category, category);
  }
}

export { CategoriesServices };
