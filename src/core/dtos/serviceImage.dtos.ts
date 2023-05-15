import { ServiceImage } from "../../infra/database/entities/serviceImage.entity";

export interface ICreateServiceImageDTO
  extends Pick<
    ServiceImage,
    "url" | "name" | "file_size" | "format" | "service_id"
  > {}

export interface IResponseServiceImageDTO
  extends Pick<ServiceImage, "id" | "url" | "name"> {}
