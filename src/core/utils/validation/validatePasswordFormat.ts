import { AppError } from "../../../core/errors/app.error";

export function validatePasswordFormat(password: string): void {
  if (password.length < 8) {
    throw new AppError("Password must be at least 8 characters long", 400);
  }
}
