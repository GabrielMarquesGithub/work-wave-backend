import { hash } from "bcryptjs";

import { IUsersRepository } from "../../core/interfaces/usersRepository.interface";
import { ICreateUserDTO, IUpdateUserDTO } from "../../core/dtos/user.dtos";

import { AppError } from "../../core/errors/app.error";

import { validateEmailFormat } from "../../core/utils/validation/validateEmailFormat";
import { validatePasswordFormat } from "../../core/utils/validation/validatePasswordFormat";
import { validateCEPFormat } from "../../core/utils/validation/validateCEPFormat";
import { validatePhoneFormat } from "../../core/utils/validation/validatePhoneFormat";
import { formatCEP } from "../../core/utils/formatting/formatCEP";
import { formatPhone } from "../../core/utils/formatting/formatPhone";
import { IStorageProvider } from "../../core/interfaces/storageProvider.interface";

class UsersServices {
  private usersRepository: IUsersRepository;
  private storageProvider: IStorageProvider;

  constructor(
    usersRepository: IUsersRepository,
    storageProvider: IStorageProvider
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
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

  async createAvatar(id: string, file: string): Promise<void> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    if (!file) {
      throw new AppError("Image does not exist", 404);
    }

    if (user.avatar_url) {
      this.storageProvider.delete(user.avatar_url, "avatar");
    }

    await this.storageProvider.save(file, "avatar");

    await this.usersRepository.update(user, { ...user, avatar_url: file });
  }
}

export { UsersServices };
