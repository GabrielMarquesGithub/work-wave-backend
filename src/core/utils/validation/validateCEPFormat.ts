import { AppError } from "../../../core/errors/app.error";

export function validateCEPFormat(cep: string): void {
  const cepRegex = /^\d{5}-?\d{3}$/;
  if (!cepRegex.test(cep)) {
    throw new AppError("Invalid CEP format", 400);
  }
}
