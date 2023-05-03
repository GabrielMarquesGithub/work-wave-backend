//DTO ou VO
interface IServiceDTO {
  name: string;
  price: number;
  description?: string;
  observation?: string;
  order: number;
  image_id?: string;
  user_id: string;
  category_id?: string;
}

export interface ICreateServiceDTO extends IServiceDTO {}

export interface IUpdateServiceDTO extends IServiceDTO {
  id: string;
}
