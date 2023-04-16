export class AppError {
  public readonly message: string;
  public readonly code: number;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }
}
