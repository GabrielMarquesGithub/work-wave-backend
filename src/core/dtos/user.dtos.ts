//DTO ou VO
interface IUserDTO {
  name: string;
  email: string;
  phone: string;
  cep: string;
}

export interface ICreateUserDTO extends IUserDTO {
  password: string;
}

export interface IUpdateUserDTO extends IUserDTO {
  id: string;
  avatar?: string | null;
  avatar_url?: string | null;
}

export interface IResponseUserDTO extends IUserDTO {
  id: string;
  avatar_url?: string;
}

export interface IAuthenticationUserDTO {
  email: string;
  password: string;
}
