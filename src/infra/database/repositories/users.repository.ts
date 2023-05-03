import { Repository } from "typeorm";

import { IUsersRepository } from "../../../core/interfaces/usersRepository.interface";
import { ICreateUserDTO, IUpdateUserDTO } from "../../../core/dtos/user.dtos";

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

  async findOneByIdWithImage(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { id },
      relations: { image: true },
    });
    return user !== null ? user : undefined;
  }

  async findOneByEmailWithImage(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email },
      relations: { image: true },
    });
    return user !== null ? user : undefined;
  }

  async create(userDTO: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(userDTO);
    await this.repository.save(user);
  }

  async update(user: User, userDTO: IUpdateUserDTO): Promise<void> {
    this.repository.merge(user, userDTO);
    await this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersRepository };
