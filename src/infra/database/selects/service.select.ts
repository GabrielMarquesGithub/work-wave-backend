import { FindOptionsSelect } from "typeorm";

import { Service } from "../entities/service.entity";

export const serviceSelect: FindOptionsSelect<Service> = {
  id: true,
  name: true,
  description: true,
  observation: true,
  price: true,
};
