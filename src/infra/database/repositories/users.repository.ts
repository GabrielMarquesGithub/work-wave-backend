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
    const user = await this.repository.findOne({
      where: { id },
      relations: { image: true },
    });
    return user !== null ? user : undefined;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email },
      relations: { image: true },
    });
    return user !== null ? user : undefined;
  }

  async create(userDTO: IUserDTO): Promise<void> {
    const user = this.repository.create(userDTO);
    await this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersRepository };
