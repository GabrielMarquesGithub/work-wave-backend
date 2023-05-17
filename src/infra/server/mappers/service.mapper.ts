import { IResponseServiceDTO } from "../../../core/dtos/service.dtos";
import { IResponseServiceImageDTO } from "../../../core/dtos/serviceImage.dtos";

import { Service } from "../../database/entities/service.entity";
import { ServiceImage } from "../../database/entities/serviceImage.entity";
import { ServiceImageMapper } from "./serviceImage.mapper";

class ServiceMapper {
  static toDTO(service: Service): IResponseServiceDTO {
    return {
      id: service.id,
      name: service.name,
      price: service.price,
      discount: service.discount,
      description: service.description,
      observation: service.observation,
      images: this.handleServicesImages(service.images),
    };
  }

  static handleServicesImages(
    servicesImages: ServiceImage[] | null
  ): IResponseServiceImageDTO[] | null {
    if (!servicesImages || servicesImages.length === 0) return null;

    return servicesImages.map((serviceImage) =>
      ServiceImageMapper.toDTO(serviceImage)
    );
  }
}

export { ServiceMapper };
