import "reflect-metadata";
import { DataSource } from "typeorm";
import { typeormDataSourceConfig } from "../configs/typeorm.config";

export const appDataSource = new DataSource(typeormDataSourceConfig);
