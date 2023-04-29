import { User } from "../../infra/database/entities/user.entity";

//DTO ou VO
export interface IUserTokenDTO {
  refresh_token: string;
  expires_date: Date;
  user_id: string;
}
