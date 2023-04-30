import { hash } from "bcryptjs";

import { IUsersRepository } from "../interfaces/usersRepository.interface";
import { IUserDTO } from "../dtos/user.dto";

import { User } from "../../infra/database/entities/user.entity";
import { AppError } from "../errors/app.error";

import { validateEmailFormat } from "../utils/validation/validateEmailFormat";
import { validatePasswordFormat } from "../utils/validation/validatePasswordFormat";
import { validateCEPFormat } from "../utils/validation/validateCEPFormat";
import { formatCEP } from "../utils/formatting/formatCEP";

class UsersServices {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async create(userDTO: IUserDTO): Promise<void> {
    validateEmailFormat(userDTO.email);
    validatePasswordFormat(userDTO.password);
    validateCEPFormat(userDTO.cep);

    userDTO.cep = formatCEP(userDTO.cep);

    // Verificação do email é realizada posteriormente para evitar uma consulta desnecessária
    const userWithEmail = await this.usersRepository.findOneByEmail(
      userDTO.email
    );
    if (userWithEmail) {
      throw new AppError("This email is already related to another user", 400);
    }

    // Criptografando a senha antes de salvar
    const hashedPassword = await hash(userDTO.password, 10);

    await this.usersRepository.create({ ...userDTO, password: hashedPassword });
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
