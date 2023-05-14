import { Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../../core/dtos/userToken.dtos";
import { IUsersTokensRepository } from "../../../core/interfaces/usersTokensRepository.interface";

import { appDataSource } from "..";

import { UserToken } from "../entities/userToken.entity";

class UsersTokensRepository implements IUsersTokensRepository {
  repository: Repository<UserToken>;

  constructor() {
    this.repository = appDataSource.getRepository(UserToken);
  }

  async findOneByUserIdAndRefreshTokenWithUser(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | null> {
    return await this.repository.findOne({
      where: { user_id: userId, refresh_token: refreshToken },
      //Dessa maneira podemos retornar relacionamentos de entidades relacionadas
      relations: { user: true },
    });
  }

  async create({ ...userTokenDTO }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create(userTokenDTO);
    return await this.repository.save(userToken);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
