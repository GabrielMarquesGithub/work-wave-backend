//DTO ou VO
interface ICategoryDTO {
  name: string;
  description?: string;
}

export interface ICreateCategoryDTO extends ICategoryDTO {}

export interface IUpdateCategoryDTO extends ICategoryDTO {
  id: string;
  icon_url?: string;
}

export interface IResponseCategoryDTO extends ICategoryDTO {
  id: string;
  icon_url?: string;
}

// export interface IResponseCategoryDTO extends ICategoryDTO {
//   id: string;
//   icon_url?: string;
// }
