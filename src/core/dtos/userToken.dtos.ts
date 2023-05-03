//DTO ou VO
interface IUserTokenDTO {
  refresh_token: string;
  expires_date: Date;
  user_id: string;
}

export interface ICreateUserTokenDTO extends IUserTokenDTO {}
