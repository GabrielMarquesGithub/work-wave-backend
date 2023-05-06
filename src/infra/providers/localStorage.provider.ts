import fs from "fs/promises";
import { resolve } from "path";

import { IStorageProvider } from "../../core/interfaces/storageProvider.interface";

import { tmpFilePath } from "../configs/upload";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    //método rename irá trocar o caminho do arquivo
    await fs.rename(
      resolve(tmpFilePath, file),
      resolve(tmpFilePath, folder, file)
    );

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(tmpFilePath, folder, file);

    try {
      await fs.stat(filename);
    } catch {
      return;
    }
    await fs.unlink(filename); // Exclui o arquivo
  }
}

export { LocalStorageProvider };
