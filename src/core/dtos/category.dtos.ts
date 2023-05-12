import { Service } from "../../infra/database/entities/service.entity";

//DTO ou VO
interface ICategoryDTO {
  name: string;
  description?: string;
}

export interface ICreateCategoryDTO extends ICategoryDTO {}

export interface IUpdateCategoryDTO extends ICategoryDTO {
  id: string;
  icon?: string | null;
  icon_url?: string | null;
}

export interface IResponseCategoryDTO extends ICategoryDTO {
  id: string;
  icon_url?: string;
  services?: Service[];
}

// export interface IResponseCategoryDTO extends ICategoryDTO {
//   id: string;
//   icon_url?: string;
// }
