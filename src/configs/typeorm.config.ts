import { DataSourceOptions } from "typeorm";

const MIGRATIONS_PATH = "src/database/migrations/*.ts";
const ENTITIES_PATH = "src/database/entities/*.ts";

const typeormDataSourceConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_DB_HOST,
  port: Number(process.env.POSTGRES_DB_PORT),
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [ENTITIES_PATH],
  migrations: [MIGRATIONS_PATH],
};

export { typeormDataSourceConfig };
