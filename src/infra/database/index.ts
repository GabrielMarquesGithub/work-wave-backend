import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";

const appDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_DB_HOST,
  port: process.env.POSTGRES_DB_PORT as number | undefined,
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  migrations: ["./migrations/**.ts"],
};

export const appDataSource = new DataSource(appDataSourceOptions);
