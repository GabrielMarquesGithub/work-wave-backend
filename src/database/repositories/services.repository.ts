import { ILike, Repository } from "typeorm";

import { ICreateServiceDTO, IUpdateServiceDTO } from "../../dtos/service.dtos";
import { IServicesRepository } from "../../interfaces/servicesRepository.interface";

import { appDataSource } from "..";

import { Service } from "../entities/service.entity";

import { ServiceOrderOptions, serviceOrderEnum } from "../../enums/order.enum";

class ServicesRepository implements IServicesRepository {
  private repository: Repository<Service>;

  constructor() {
    this.repository = appDataSource.getRepository(Service);
  }

  async findOneById(id: string): Promise<Service | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByIdWithServicesImagesAndUser(
    id: string
  ): Promise<Service | null> {
    return await this.repository.findOne({
      where: { id },
      relations: { images: true, user: true },
    });
  }

  async findByUserIdWithServicesImages(
    id: string,
    skip: number,
    take: number,
    order: ServiceOrderOptions
  ): Promise<Service[] | null> {
    return await this.repository.find({
      where: { user_id: id },
      relations: { images: true },
      order: serviceOrderEnum[order],
      skip,
      take,
    });
  }

  async findByCategoryIdWithServicesImages(
    id: string,
    skip: number,
    take: number,
    order: ServiceOrderOptions,
    cep?: string
  ): Promise<Service[] | null> {
    return await this.repository.find({
      where: { category_id: id, user: { cep } },
      relations: { images: true },
      order: serviceOrderEnum[order],
      skip,
      take,
    });
  }

  async findBySearchTextWithServicesImages(
    searchText: string,
    skip: number,
    take: number,
    order: ServiceOrderOptions,
    cep?: string
  ): Promise<Service[] | null> {
    return await this.repository.find({
      where: [
        { name: ILike(`%${searchText}%`), user: { cep } },
        { description: ILike(`%${searchText}%`), user: { cep } },
        { observation: ILike(`%${searchText}%`), user: { cep } },
      ],
      relations: { images: true },
      order: serviceOrderEnum[order],
      skip,
      take,
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
