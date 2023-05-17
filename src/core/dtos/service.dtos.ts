import { Service } from "../../infra/database/entities/service.entity";

import { IResponseServiceImageDTO } from "./serviceImage.dtos";

export interface ICreateServiceDTO
  extends Pick<
    Service,
    | "name"
    | "price"
    | "discount"
    | "description"
    | "observation"
    | "order"
    | "user_id"
    | "category_id"
  > {}

export interface ICreateServiceRequestDTO
  extends Pick<
    Service,
    | "name"
    | "price"
    | "discount"
    | "description"
    | "observation"
    | "user_id"
    | "category_id"
  > {}

export interface IUpdateServiceDTO
  extends Pick<
    Service,
    | "id"
    | "name"
    | "price"
    | "discount"
    | "description"
    | "observation"
    | "order"
    | "user_id"
    | "category_id"
  > {}

export interface IUpdateServiceRequestDTO
  extends Pick<
    Service,
    | "id"
    | "name"
    | "price"
    | "discount"
    | "description"
    | "observation"
    | "order"
    | "user_id"
    | "category_id"
  > {}

type ResponseServiceType = Pick<
  Service,
  "id" | "name" | "price" | "discount" | "description" | "observation"
> & { images: IResponseServiceImageDTO[] | null };

export interface IResponseServiceDTO extends ResponseServiceType {}
