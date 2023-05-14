import { ICreateUserDTO, IUpdateUserDTO } from "../dtos/user.dtos";

import { User } from "../../infra/database/entities/user.entity";

export interface IUsersRepository {
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(name: string): Promise<User | null>;
  create({}: ICreateUserDTO): Promise<void>;
  update(user: User, userDTO: IUpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
