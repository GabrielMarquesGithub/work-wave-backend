import { IUserDTO } from "../dtos/user.dto";

import { User } from "../../infra/database/entities/user.entity";

export interface IUsersRepository {
  findOneById(id: string): Promise<User | undefined>;
  findOneByEmail(name: string): Promise<User | undefined>;
  create({}: IUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
