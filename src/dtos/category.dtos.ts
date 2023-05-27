import { Category } from "../database/entities/category.entity";
import { IResponseServiceDTO } from "./service.dtos";

export interface ICreateCategoryDTO
  extends Pick<Category, "name" | "description"> {}

export interface ICreateCategoryRequestDTO
  extends Pick<Category, "name" | "description"> {}

export interface IUpdateCategoryDTO
  extends Pick<Category, "icon" | "icon_url"> {}

type ResponseCategoryType = Pick<
  Category,
  "id" | "name" | "description" | "icon_url"
> & { services: IResponseServiceDTO[] | null };

export interface IResponseCategoryDTO extends ResponseCategoryType {}
