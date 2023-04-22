import { IUsersRepository } from "../interfaces/users.repository.interface";
import { IUserDTO } from "../dtos/user.dto";

import { User } from "../../infra/database/entities/user.entity";
import { AppError } from "../errors/app.error";

class UsersServices {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async findAll(): Promise<User[]> {
    return (await this.usersRepository.findAll()) ?? [];
  }

  async create(userDTO: IUserDTO): Promise<void> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cepRegex = /^\d{5}-?\d{3}$/;

    if (!emailRegex.test(userDTO.email)) {
      throw new AppError("Invalid email format", 400);
    }

    if (userDTO.password.length < 8) {
      throw new AppError("Password must be at least 8 characters long", 400);
    }

    if (!cepRegex.test(userDTO.cep)) {
      throw new AppError("Invalid CEP format", 400);
    }

    //caso o cep não possua hífen ele recebe
    userDTO.cep = userDTO.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");

    //verificação do email é realizada posteriormente para evitar uma consulta desnecessária
    const userWithEmail = await this.usersRepository.findOneByEmail(
      userDTO.email
    );
    if (userWithEmail) {
      throw new AppError("This email is already related to another user", 400);
    }

    await this.usersRepository.create(userDTO);
  }

  async delete(id: string): Promise<void> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    await this.usersRepository.delete(id);
  }
}

export { UsersServices };
