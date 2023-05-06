import { IResponseUserDTO } from "../../../core/dtos/user.dtos";

import { User } from "../../database/entities/user.entity";

import { appUrl } from "../../configs/upload";

class UserMapper {
  static toDTO(user: User): IResponseUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cep: user.cep,
      avatar_url: user.avatar_url
        ? `${appUrl}avatar/${user.avatar_url}`
        : undefined,
    };
  }
}

export { UserMapper };
