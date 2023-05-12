import { ICreateUserDTO, IUpdateUserDTO } from "../dtos/user.dtos";

import { User } from "../../infra/database/entities/user.entity";

export interface IUsersRepository {
  findOneById(id: string): Promise<User | undefined>;
  findOneByEmail(name: string): Promise<User | undefined>;
  create({}: ICreateUserDTO): Promise<void>;
  update(user: User, userDTO: IUpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
