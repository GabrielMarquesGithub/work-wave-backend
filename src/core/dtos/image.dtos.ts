interface IImageDTO {
  url: string;
  name: string;
  format: string;
  file_path: string;
  file_size: number;
}

export interface ICreateImageDTO extends IImageDTO {}
