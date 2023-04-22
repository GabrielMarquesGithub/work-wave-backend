import { ICategoryDTO } from "../dtos/category.dto";

import { Category } from "../../infra/database/entities/category.entity";

export interface ICategoriesRepository {
  findOneById(id: string): Promise<Category | undefined>;
  findOneByName(name: string): Promise<Category | undefined>;
  findAll(): Promise<Category[] | undefined>;
  create({}: ICategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
