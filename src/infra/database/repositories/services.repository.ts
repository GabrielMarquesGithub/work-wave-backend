import { Repository } from "typeorm";

import { IServiceDTO } from "../../../core/dtos/service.dto";
import { IServicesRepository } from "../../../core/interfaces/servicesRepository.interface";

import { appDataSource } from "..";

import { Service } from "../entities/service.entity";

class ServicesRepository implements IServicesRepository {
  private repository: Repository<Service>;

  constructor() {
    this.repository = appDataSource.getRepository(Service);
  }
  async findOneById(id: string): Promise<Service | undefined> {
    const service = await this.repository.findOneBy({ id });
    return service !== null ? service : undefined;
  }

  async create(serviceDTO: IServiceDTO): Promise<void> {
    const user = this.repository.create(serviceDTO);
    await this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ServicesRepository };
