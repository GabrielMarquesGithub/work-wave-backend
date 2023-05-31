import "dotenv/config"; // Carregando as variáveis de ambiente
import { DataSourceOptions } from "typeorm";

const itIsDevEnv = process.env.NODE_ENV === "dev";

const MIGRATIONS_PATH = itIsDevEnv
  ? "src/database/migrations/*.ts"
  : "dist/database/migrations/*.js";
const ENTITIES_PATH = itIsDevEnv
  ? "src/database/entities/*.ts"
  : "dist/database/entities/*.js";

const typeormDataSourceConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [ENTITIES_PATH],
  migrations: [MIGRATIONS_PATH],
};

export { typeormDataSourceConfig };
