import { UserToken } from "../../infra/database/entities/userToken.entity";
import { IUserTokenDTO } from "../dtos/userToken.dto";

export interface IUsersTokensRepository {
  findOneByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined>;
  create({}: IUserTokenDTO): Promise<UserToken>;
  delete(id: string): Promise<void>;
}
