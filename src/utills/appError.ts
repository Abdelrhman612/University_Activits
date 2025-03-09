export class AppError extends Error {
  statusCode: number;
  statusText: string;

  constructor(Message: string, statusCode: number, statusText: string) {
    super(Message);
    this.statusCode = statusCode;
    this.statusText = statusText;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
