import { IServicesRepository } from "../../core/interfaces/servicesRepository.interface";
import { IServicesImagesRepository } from "../../core/interfaces/servicesImagesRepository.interface";

import {
  ICreateServiceDTO,
  IUpdateServiceDTO,
} from "../../core/dtos/service.dtos";

import { AppError } from "../../core/errors/app.error";
import { IStorageProvider } from "../../core/interfaces/storageProvider.interface";
import { appUrl } from "../configs/upload";
import { Service } from "../database/entities/service.entity";

class ServicesServices {
  private servicesRepository: IServicesRepository;
  private servicesImagesRepository: IServicesImagesRepository;
  private storageProvider: IStorageProvider;

  constructor(
    servicesRepository: IServicesRepository,
    servicesImagesRepository: IServicesImagesRepository,
    storageProvider: IStorageProvider
  ) {
    this.servicesRepository = servicesRepository;
    this.servicesImagesRepository = servicesImagesRepository;
    this.storageProvider = storageProvider;
  }

  async checkIfServiceExists(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOneById(id);

    if (!service) {
      throw new AppError("Service does not exist", 404);
    }

    return service;
  }

  async findByUserId(id: string): Promise<Service[]> {
    return (await this.servicesRepository.findByUserId(id)) ?? [];
  }

  async create(serviceDTO: ICreateServiceDTO): Promise<void> {
    await this.servicesRepository.create(serviceDTO);
  }

  async update(serviceDTO: IUpdateServiceDTO): Promise<void> {
    const service = await this.checkIfServiceExists(serviceDTO.id);

    await this.servicesRepository.update(service, serviceDTO);
  }

  async delete(id: string): Promise<void> {
    await this.checkIfServiceExists(id);

    await this.servicesRepository.delete(id);
  }

  async createImages(id: string, files: Express.Multer.File[]): Promise<void> {
    await this.checkIfServiceExists(id);

    if (!files || files.length === 0) {
      throw new AppError("Image does not exist", 404);
    }

    await Promise.all(
      files.map(async (file) => {
        this.storageProvider.save(file.filename, "service");

        return await this.servicesImagesRepository.create({
          service_id: id,
          name: file.filename,
          url: `${appUrl}service/${file.filename}`,
          file_size: file.size,
          format: file.mimetype,
        });
      })
    );
  }

  async deleteImage(id: string): Promise<void> {
    const image = await this.servicesImagesRepository.findOneById(id);

    if (!image) {
      throw new AppError("Image does not exist", 404);
    }

    this.storageProvider.delete(image.name, "service");

    await this.servicesImagesRepository.delete(id);
  }
}

export { ServicesServices };
