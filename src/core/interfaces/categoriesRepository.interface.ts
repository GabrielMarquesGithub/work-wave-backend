import {
  ICreateCategoryDTO,
  IResponseCategoryDTO,
  IUpdateCategoryDTO,
} from "../dtos/category.dtos";

import { Category } from "../../infra/database/entities/category.entity";

export interface ICategoriesRepository {
  findOneById(id: string): Promise<Category | null>;
  findOneByName(name: string): Promise<Category | null>;
  find(skip?: number, take?: number): Promise<Category[] | null>;
  create({}: ICreateCategoryDTO): Promise<void>;
  update(category: Category, categoryDTO: IUpdateCategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
