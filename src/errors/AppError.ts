export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  // StatusCode
  // 400 default
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
