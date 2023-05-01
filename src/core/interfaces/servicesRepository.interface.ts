import { IServiceDTO } from "../dtos/service.dto";

import { Service } from "../../infra/database/entities/service.entity";

export interface IServicesRepository {
  findOneById(id: string): Promise<Service | undefined>;
  create({}: IServiceDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
