import { IServicesRepository } from "../interfaces/servicesRepository.interface";
import { ICreateServiceDTO, IUpdateServiceDTO } from "../dtos/service.dtos";

import { AppError } from "../errors/app.error";

class ServicesServices {
  private servicesRepository: IServicesRepository;

  constructor(servicesRepository: IServicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async create(serviceDTO: ICreateServiceDTO): Promise<void> {
    await this.servicesRepository.create(serviceDTO);
  }

  async update(serviceDTO: IUpdateServiceDTO): Promise<void> {
    const service = await this.servicesRepository.findOneById(serviceDTO.id);

    if (!service) {
      throw new AppError("Service does not exist", 404);
    }

    await this.servicesRepository.update(service, serviceDTO);
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
