import { IResponseCategoryDTO } from "../../../core/dtos/category.dtos";
import { IResponseServiceDTO } from "../../../core/dtos/service.dtos";

import { Category } from "../../database/entities/category.entity";
import { Service } from "../../database/entities/service.entity";
import { ServiceMapper } from "./service.mapper";

class CategoryMapper {
  static toDTO(category: Category): IResponseCategoryDTO {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      icon_url: category.icon_url,
      services: this.handleServices(category.services),
    };
  }

  private static handleServices(
    services: Service[] | null
  ): IResponseServiceDTO[] | null {
    if (!services || services.length === 0) return null;

    return services.map((service) => ServiceMapper.toDTO(service));
  }
}

export { CategoryMapper };
