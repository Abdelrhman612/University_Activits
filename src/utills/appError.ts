export class AppError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message: string, statusCode: number, statusText: string) {
    super(message); // Initialize the base class with the message
    this.statusCode = statusCode;
    this.statusText = statusText;

    // Set the prototype explicitly to preserve the error stack trace
    Object.setPrototypeOf(this, AppError.prototype);
  }

  // Optionally, you can keep the `create` method if needed for additional modifications
  create(message: string, statusCode: number, statusText: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}
