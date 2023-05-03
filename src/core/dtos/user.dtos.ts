import { Image } from "../../infra/database/entities/serviceImage.entity";

//DTO ou VO
interface IUserDTO {
  name: string;
  email: string;
  phone: string;
  cep: string;
  image_id?: string;
}

export interface ICreateUserDTO extends IUserDTO {
  password: string;
}

export interface IUpdateUserDTO extends IUserDTO {
  id: string;
}

export interface IResponseUserDTO extends IUserDTO {
  id: string;
  image?: Image;
}

export interface IAuthenticationUserDTO {
  email: string;
  password: string;
}
