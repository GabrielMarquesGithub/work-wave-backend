import { User } from "../database/entities/user.entity";
import { IResponseServiceDTO } from "./service.dtos";

export interface ICreateUserDTO
  extends Pick<User, "name" | "email" | "phone" | "cep" | "password"> {}

export interface ICreateUserRequestDTO
  extends Pick<User, "name" | "email" | "phone" | "cep" | "password"> {}

// Criação de uma tipagem mais complexa
type UpdateUserType = Pick<User, "id" | "name" | "email" | "phone" | "cep"> &
  Partial<Pick<User, "password" | "avatar" | "avatar_url">>;

export interface IUpdateUserDTO extends UpdateUserType {}

export interface IUpdateUserRequestDTO
  extends Pick<
    IUpdateUserDTO,
    "id" | "name" | "email" | "password" | "phone" | "cep"
  > {}

export interface IResponseUserDTO
  extends Pick<User, "id" | "name" | "email" | "phone" | "cep" | "avatar_url"> {
  services: IResponseServiceDTO[] | null;
}

export interface IAuthenticationUserDTO
  extends Pick<User, "email" | "password"> {}
