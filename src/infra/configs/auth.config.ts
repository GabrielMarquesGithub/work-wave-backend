import "dotenv/config";

const authConfig = {
  secret_token: process.env.JWT_SECRET_TOKEN ?? "",
  expires_in_token: "15m", //15 minutos
  secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN ?? "",
  expires_in_refresh_token: "30d", //30 dias
};

export { authConfig };
