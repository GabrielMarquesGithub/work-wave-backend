import { ICreateServiceDTO, IUpdateServiceDTO } from "../dtos/service.dtos";

import { Service } from "../../infra/database/entities/service.entity";

export interface IServicesRepository {
  findOneById(id: string): Promise<Service | undefined>;
  findByUserId(id: string): Promise<Service[] | undefined>;
  create({}: ICreateServiceDTO): Promise<void>;
  update(service: Service, serviceDTO: IUpdateServiceDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
