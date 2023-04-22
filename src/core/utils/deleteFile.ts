import fs from "fs/promises";

export async function deleteFile(filePath: string): Promise<void> {
  try {
    await fs.stat(filePath);
  } catch {
    return;
  }
  await fs.unlink(filePath); // Exclui o arquivo
}
