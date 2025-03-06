export class AppError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message: string, statusCode: number, statusText: string) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
