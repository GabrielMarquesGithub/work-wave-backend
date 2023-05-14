import { Category } from "../../infra/database/entities/category.entity";

export interface ICreateCategoryDTO
  extends Pick<Category, "name" | "description"> {}

export interface IUpdateCategoryDTO
  extends Pick<Category, "icon" | "icon_url"> {}

export interface IResponseCategoryDTO
  extends Pick<Category, "id" | "name" | "description" | "icon_url"> {}
