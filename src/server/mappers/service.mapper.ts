import { IResponseServiceDTO } from "../../dtos/service.dtos";
import { IResponseServiceImageDTO } from "../../dtos/serviceImage.dtos";
import { IResponseUserDTO } from "../../dtos/user.dtos";

import { Service } from "../../database/entities/service.entity";
import { ServiceImage } from "../../database/entities/serviceImage.entity";
import { User } from "../../database/entities/user.entity";
import { ServiceImageMapper } from "./serviceImage.mapper";
import { UserMapper } from "./user.mapper";

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
      user: this.handleUser(service.user),
    };
  }

  private static handleServicesImages(
    servicesImages: ServiceImage[] | null
  ): IResponseServiceImageDTO[] | null {
    if (!servicesImages || servicesImages.length === 0) return null;

    return servicesImages.map((serviceImage) =>
      ServiceImageMapper.toDTO(serviceImage)
    );
  }

  private static handleUser(user: User): IResponseUserDTO | null {
    if (!user) return null;

    return UserMapper.toDTO(user);
  }
}

export { ServiceMapper };
