import multer, { Options } from "multer";
import { Request } from "express";
import { extname, join } from "path";
import { v4 as uuidv4 } from "uuid";

import { AppError } from "../../core/errors/app.error";

interface IMulterConfig {
  folder: string;
}

const multerImageUploadConfig = ({ folder }: IMulterConfig): Options => {
  // Para obtenção do diretório correto
  const destination = join(__dirname, "..", "..", "..", folder);

  // Para garantia da existência do diretório
  // if (!existsSync(destination)) {
  //   mkdirSync(destination, { recursive: true });
  // }

  return {
    storage: multer.diskStorage({
      destination: destination,
      filename: (req: Request, file: Express.Multer.File, callback) => {
        // Gera um nome de arquivo aleatório usando um UUID
        const fileName = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, fileName);
      },
    }),
    limits: {
      // Define um limite de tamanho de arquivo de 2MB
      fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: Express.Multer.File, callback) => {
      // Verifica se a extensão do arquivo é permitida
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
      const ext = extname(file.originalname).toLowerCase(); // Obtém somente a extensão do arquivo
      if (!allowedExtensions.includes(ext)) {
        return callback(new AppError(`Invalid file extension: ${ext}`, 400));
      }

      // Verifica se o tipo MIME do arquivo é permitido
      const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
      ];
      if (!allowedMimes.includes(file.mimetype)) {
        return callback(
          new AppError(`Invalid file type: ${file.mimetype}`, 400)
        );
      }

      callback(null, true);
    },
  };
};

export { multerImageUploadConfig };
