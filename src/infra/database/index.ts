import "reflect-metadata";
import { DataSource } from "typeorm";
import { typeormDataSourceConfig } from "../configs/typeormDataSource.config";

export const appDataSource = new DataSource(typeormDataSourceConfig);
