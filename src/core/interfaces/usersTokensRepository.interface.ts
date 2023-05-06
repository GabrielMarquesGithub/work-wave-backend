import { UserToken } from "../../infra/database/entities/userToken.entity";
import { ICreateUserTokenDTO } from "../dtos/userToken.dtos";

export interface IUsersTokensRepository {
  findOneByUserIdAndRefreshTokenWithUser(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined>;
  create({}: ICreateUserTokenDTO): Promise<UserToken>;
  delete(id: string): Promise<void>;
}
