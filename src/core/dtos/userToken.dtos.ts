//DTO ou VO
interface IBaseUserTokenDTO {
  refresh_token: string;
  expires_date: Date;
  user_id: string;
}

export interface ICreateUserTokenDTO extends IBaseUserTokenDTO {}
