import { ICreateServiceDTO, IUpdateServiceDTO } from "../dtos/service.dtos";

import { Service } from "../../infra/database/entities/service.entity";

export interface IServicesRepository {
  findOneById(id: string): Promise<Service | null>;
  findByUserId(id: string): Promise<Service[] | null>;
  create({}: ICreateServiceDTO): Promise<void>;
  update(service: Service, serviceDTO: IUpdateServiceDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
