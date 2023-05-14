import { Repository } from "typeorm";

import {
  ICreateServiceDTO,
  IUpdateServiceDTO,
} from "../../../core/dtos/service.dtos";
import { IServicesRepository } from "../../../core/interfaces/servicesRepository.interface";

import { appDataSource } from "..";

import { Service } from "../entities/service.entity";
import { serviceSelect } from "../selects/service.select";
import { serviceImageSelect } from "../selects/serviceImage.select";

class ServicesRepository implements IServicesRepository {
  private repository: Repository<Service>;

  constructor() {
    this.repository = appDataSource.getRepository(Service);
  }

  async findOneById(id: string): Promise<Service | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByUserId(id: string): Promise<Service[] | null> {
    return await this.repository.find({
      where: { user_id: id },
      relations: { images: true },
      select: { ...serviceSelect, images: serviceImageSelect },
    });
  }

  async create(serviceDTO: ICreateServiceDTO): Promise<void> {
    const service = this.repository.create(serviceDTO);
    await this.repository.save(service);
  }

  async update(service: Service, serviceDTO: IUpdateServiceDTO): Promise<void> {
    this.repository.merge(service, serviceDTO);
    await this.repository.save(service);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ServicesRepository };
