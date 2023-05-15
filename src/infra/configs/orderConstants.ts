import { FindOptionsOrder } from "typeorm";
import { Service } from "../database/entities/service.entity";

export type ServiceOrderOptions =
  | "recentDate"
  | "oldDate"
  | "lowerPrice"
  | "higherPrice";

export const serviceOrderConstants: Record<
  ServiceOrderOptions,
  FindOptionsOrder<Service>
> = {
  recentDate: { created_at: "DESC" },
  oldDate: { created_at: "ASC" },
  lowerPrice: { price: "ASC" },
  higherPrice: { price: "DESC" },
};
