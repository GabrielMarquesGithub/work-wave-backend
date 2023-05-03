import { UserToken } from "../../infra/database/entities/userToken.entity";
import { IUserTokenDTO } from "../dtos/userToken.dtos";

export interface IUsersTokensRepository {
  findOneByUserIdAndRefreshTokenWithUser(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined>;
  create({}: IUserTokenDTO): Promise<UserToken>;
  delete(id: string): Promise<void>;
}
