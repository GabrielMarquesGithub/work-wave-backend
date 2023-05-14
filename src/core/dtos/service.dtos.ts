import { Service } from "../../infra/database/entities/service.entity";

export interface ICreateServiceDTO
  extends Pick<
    Service,
    "name" | "price" | "description" | "observation" | "user_id" | "category_id"
  > {}

export interface IUpdateServiceDTO
  extends Pick<
    Service,
    | "id"
    | "name"
    | "price"
    | "description"
    | "observation"
    | "user_id"
    | "category_id"
  > {}
