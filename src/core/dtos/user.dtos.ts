//DTO ou VO
interface IBaseUserDTO {
  name: string;
  email: string;
  phone: string;
  cep: string;
}

export interface ICreateUserDTO extends IBaseUserDTO {
  password: string;
}

export interface IUpdateUserDTO extends IBaseUserDTO {
  id: string;
  avatar: string | null;
  avatar_url: string | null;
}

export interface IResponseUserDTO extends IBaseUserDTO {
  id: string;
  avatar_url: string | null;
}

export interface IAuthenticationUserDTO {
  email: string;
  password: string;
}
