interface IBaseServiceImageDTO {
  url: string;
  name: string;
  file_size: number;
  format: string;
  service_id: string;
}

export interface ICreateServiceImageDTO extends IBaseServiceImageDTO {}
