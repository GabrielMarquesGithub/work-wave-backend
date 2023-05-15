import { User } from "../../infra/database/entities/user.entity";

export interface ICreateUserDTO
  extends Pick<User, "name" | "email" | "phone" | "cep" | "password"> {}

export interface ICreateUserRequestDTO
  extends Pick<User, "name" | "email" | "phone" | "cep" | "password"> {}

// Criação de uma tipagem mais complexa
type UpdateUserType = Pick<User, "id" | "name" | "email" | "phone" | "cep"> &
  Partial<Pick<User, "avatar" | "avatar_url">>;

export interface IUpdateUserDTO extends UpdateUserType {}

export interface IUpdateUserRequestDTO
  extends Pick<User, "id" | "name" | "email" | "phone" | "cep"> {}

export interface IResponseUserDTO
  extends Pick<
    User,
    "id" | "name" | "email" | "phone" | "cep" | "avatar_url"
  > {}

export interface IAuthenticationUserDTO
  extends Pick<User, "email" | "password"> {}
