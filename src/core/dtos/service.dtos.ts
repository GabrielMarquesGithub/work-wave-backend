//DTO ou VO
interface IBaseServiceDTO {
  name: string;
  price: number;
  description: string | null;
  observation: string | null;
  order: number;
  user_id: string;
  category_id: string | null;
}

export interface ICreateServiceDTO extends IBaseServiceDTO {}

export interface IUpdateServiceDTO extends IBaseServiceDTO {
  id: string;
}
