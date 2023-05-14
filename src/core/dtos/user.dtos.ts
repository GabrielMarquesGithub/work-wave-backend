import { User } from "../../infra/database/entities/user.entity";

export interface ICreateUserDTO
  extends Pick<User, "name" | "email" | "phone" | "cep" | "password"> {}

export interface IUpdateUserDTO
  extends Pick<
    User,
    "id" | "name" | "email" | "phone" | "cep" | "avatar" | "avatar_url"
  > {}

export interface IResponseUserDTO
  extends Pick<
    User,
    "id" | "name" | "email" | "phone" | "cep" | "avatar_url"
  > {}

export interface IAuthenticationUserDTO
  extends Pick<User, "email" | "password"> {}
