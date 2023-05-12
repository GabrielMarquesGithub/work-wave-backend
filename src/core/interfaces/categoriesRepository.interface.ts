import { ICreateCategoryDTO, IUpdateCategoryDTO } from "../dtos/category.dtos";

import { Category } from "../../infra/database/entities/category.entity";

export interface ICategoriesRepository {
  findOneById(id: string): Promise<Category | undefined>;
  findOneByIdWithServicesAndImagesServices(
    id: string,
    skip: number,
    limit: number
  ): Promise<Category | undefined>;
  findOneByName(name: string): Promise<Category | undefined>;
  findAll(): Promise<Category[] | undefined>;
  create({}: ICreateCategoryDTO): Promise<void>;
  update(category: Category, categoryDTO: IUpdateCategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
