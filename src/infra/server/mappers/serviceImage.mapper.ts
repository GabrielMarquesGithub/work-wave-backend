import { IResponseServiceImageDTO } from "../../../core/dtos/serviceImage.dtos";

import { ServiceImage } from "../../database/entities/serviceImage.entity";

class ServiceImageMapper {
  static toDTO(serviceImage: ServiceImage): IResponseServiceImageDTO {
    return {
      id: serviceImage.id,
      url: serviceImage.url,
      name: serviceImage.name,
    };
  }
}

export { ServiceImageMapper };
