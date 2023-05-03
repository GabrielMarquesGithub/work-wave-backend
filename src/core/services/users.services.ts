import { hash } from "bcryptjs";

import { IUsersRepository } from "../interfaces/usersRepository.interface";
import { ICreateUserDTO, IUpdateUserDTO } from "../dtos/user.dtos";

import { AppError } from "../errors/app.error";

import { validateEmailFormat } from "../utils/validation/validateEmailFormat";
import { validatePasswordFormat } from "../utils/validation/validatePasswordFormat";
import { validateCEPFormat } from "../utils/validation/validateCEPFormat";
import { validatePhoneFormat } from "../utils/validation/validatePhoneFormat";
import { formatCEP } from "../utils/formatting/formatCEP";
import { formatPhone } from "../utils/formatting/formatPhone";

class UsersServices {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async create(userDTO: ICreateUserDTO): Promise<void> {
    validateEmailFormat(userDTO.email);
    validatePasswordFormat(userDTO.password);
    validateCEPFormat(userDTO.cep);
    validatePhoneFormat(userDTO.phone);

    userDTO.cep = formatCEP(userDTO.cep);
    userDTO.phone = formatPhone(userDTO.phone);

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

  async update(userDTO: IUpdateUserDTO): Promise<void> {
    validateEmailFormat(userDTO.email);
    validateCEPFormat(userDTO.cep);
    validatePhoneFormat(userDTO.phone);

    userDTO.cep = formatCEP(userDTO.cep);
    userDTO.phone = formatPhone(userDTO.phone);

    const user = await this.usersRepository.findOneById(userDTO.id);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    if (user.email !== userDTO.email) {
      const userWithEmail = await this.usersRepository.findOneByEmail(
        userDTO.email
      );

      if (userWithEmail) {
        throw new AppError(
          "This email is already related to another user",
          400
        );
      }
    }

    await this.usersRepository.update(user, userDTO);
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
