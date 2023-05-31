import { IResponseUserDTO } from "../../dtos/user.dtos";

import { User } from "../../database/entities/user.entity";
import { Service } from "../../database/entities/service.entity";
import { IResponseServiceDTO } from "../../dtos/service.dtos";
import { ServiceMapper } from "./service.mapper";

class UserMapper {
  static toDTO(user: User): IResponseUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cep: user.cep,
      avatar_url: user.avatar_url,
      services: this.handleServices(user.services),
    };
  }

  private static handleServices(
    services: Service[] | null
  ): IResponseServiceDTO[] | null {
    if (!services || services.length === 0) return null;

    return services.map((service) => ServiceMapper.toDTO(service));
  }
}

export { UserMapper };
