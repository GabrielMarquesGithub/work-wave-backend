import { AppError } from "../../errors/app.error";

export function validatePasswordChangeCode(code: string): void {
  if (code.length < 6) {
    throw new AppError("Incorrect code format", 400);
  }
}
