import { Repository } from "typeorm";

import { IUsersRepository } from "../../../core/interfaces/usersRepository.interface";
import { IUserDTO } from "../../../core/dtos/user.dto";

import { appDataSource } from "..";

import { User } from "../entities/user.entity";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async findOneById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ id });
    return user !== null ? user : undefined;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ email });
    return user !== null ? user : undefined;
  }

  async findAll(): Promise<User[] | undefined> {
    return await this.repository.find();
  }

  async create(userDTO: IUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, userDTO);

    await this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersRepository };
