import { IResponseCategoryDTO } from "../../../core/dtos/category.dtos";

import { appUrl } from "../../configs/upload";
import { Category } from "../../database/entities/category.entity";

class CategoryMapper {
  static toDTO(category: Category): IResponseCategoryDTO {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      icon_url: category.icon_url
        ? `${appUrl}icon/${category.icon_url}`
        : undefined,
    };
  }
}

export { CategoryMapper };
