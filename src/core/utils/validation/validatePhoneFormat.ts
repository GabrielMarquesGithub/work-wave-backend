import { AppError } from "../../errors/app.error";

export function validatePhoneFormat(phone: string): void {
  if (typeof phone !== "string") {
    throw new AppError("Invalid phone format", 400);
  }
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 8 || cleaned.length > 13) {
    throw new AppError("Invalid phone format", 400);
  }
}
