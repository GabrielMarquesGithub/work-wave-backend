import { hash } from "bcryptjs";

import { IUsersRepository } from "../interfaces/usersRepository.interface";
import { IStorageProvider } from "../interfaces/storageProvider.interface";
import {
  ICreateUserRequestDTO,
  IResponseUserDTO,
  IUpdateUserDTO,
  IUpdateUserRequestDTO,
} from "../dtos/user.dtos";

import { AppError } from "../errors/app.error";

import { appUrl } from "../configs/upload.config";

import { validateEmailFormat } from "../utils/validation/validateEmailFormat";
import { validatePasswordFormat } from "../utils/validation/validatePasswordFormat";
import { validateCEPFormat } from "../utils/validation/validateCEPFormat";
import { validatePhoneFormat } from "../utils/validation/validatePhoneFormat";

import { formatCEP } from "../utils/formatting/formatCEP";
import { formatPhone } from "../utils/formatting/formatPhone";

import { User } from "../database/entities/user.entity";
import { UserMapper } from "../server/mappers/user.mapper";

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

  async checkIfUserExists(id: string): Promise<User> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    return user;
  }

  async findOneById(id: string): Promise<IResponseUserDTO> {
    return UserMapper.toDTO(await this.checkIfUserExists(id));
  }

  async create(userDTO: ICreateUserRequestDTO): Promise<void> {
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

  async update(userDTO: IUpdateUserRequestDTO): Promise<void> {
    validateEmailFormat(userDTO.email);
    validateCEPFormat(userDTO.cep);
    validatePhoneFormat(userDTO.phone);

    userDTO.cep = formatCEP(userDTO.cep);
    userDTO.phone = formatPhone(userDTO.phone);

    const user = await this.checkIfUserExists(userDTO.id);

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
    await this.checkIfUserExists(id);

    await this.usersRepository.delete(id);
  }

  async createAvatar(id: string, file: string): Promise<void> {
    const user = await this.checkIfUserExists(id);

    if (!file) {
      throw new AppError("Image does not exist", 404);
    }

    if (user.avatar) {
      this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(file, "avatar");

    const newUser: IUpdateUserDTO = {
      ...user,
      avatar: file,
      avatar_url: `${appUrl}avatar/${file}`,
    };

    await this.usersRepository.update(user, newUser);
  }

  async deleteAvatar(id: string): Promise<void> {
    const user = await this.checkIfUserExists(id);

    if (!user.avatar_url || !user.avatar) {
      throw new AppError("Image does not exist", 404);
    }

    this.storageProvider.delete(user.avatar, "avatar");

    // Excluindo a URL e o caminho do arquivo
    user.avatar = null;
    user.avatar_url = null;

    await this.usersRepository.update(user, user);
  }
}

export { UsersServices };
