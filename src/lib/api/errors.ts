export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends ApiError {
  constructor(message = "Invalid request") {
    super(message, 400);
    this.name = "ValidationError";
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
