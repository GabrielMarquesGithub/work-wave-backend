import { ServiceImage } from "../../infra/database/entities/serviceImage.entity";

//DTO ou VO
interface IServiceDTO {
  name: string;
  price: number;
  description?: string;
  observation?: string;
  order: number;
  user_id: string;
  category_id?: string;
}

export interface ICreateServiceDTO extends IServiceDTO {}

export interface IUpdateServiceDTO extends IServiceDTO {
  id: string;
  images?: ServiceImage[];
}
