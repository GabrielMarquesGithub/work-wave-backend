const authConfig = {
  secret_token: process.env.JWT_SECRET_TOKEN ?? "",
  expires_in_token: "10d", //15 minutos tenho que mudar !!!
  secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN ?? "",
  expires_in_refresh_token: "30d", //30 dias
};

export { authConfig };
