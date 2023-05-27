import { IResponseUserDTO } from "../../dtos/user.dtos";

import { User } from "../../database/entities/user.entity";

class UserMapper {
  static toDTO(user: User): IResponseUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cep: user.cep,
      avatar_url: user.avatar_url,
    };
  }
}

export { UserMapper };
