import { UserToken } from "../database/entities/userToken.entity";
import { ICreateUserTokenDTO } from "../dtos/userToken.dtos";

export interface IUsersTokensRepository {
  findOneByUserIdAndRefreshTokenWithUser(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | null>;
  create({}: ICreateUserTokenDTO): Promise<UserToken>;
  delete(id: string): Promise<void>;
}
