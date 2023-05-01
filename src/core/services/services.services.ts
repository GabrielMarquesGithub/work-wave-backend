import { IServicesRepository } from "../interfaces/servicesRepository.interface";
import { IServiceDTO } from "../dtos/service.dto";

import { AppError } from "../errors/app.error";
import { Service } from "../../infra/database/entities/service.entity";

class ServicesServices {
  private servicesRepository: IServicesRepository;

  constructor(servicesRepository: IServicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async create(serviceDTO: IServiceDTO): Promise<void> {
    await this.servicesRepository.create(serviceDTO);
  }

  async delete(id: string): Promise<void> {
    const service = await this.servicesRepository.findOneById(id);

    if (!service) {
      throw new AppError("Service does not exist", 404);
    }

    await this.servicesRepository.delete(id);
  }
}

export { ServicesServices };
