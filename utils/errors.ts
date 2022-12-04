/* eslint-disable max-classes-per-file */
export default class BaseError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}


export class ValidationError extends BaseError {
  constructor(message?: string) {
    super(message || 'validation error', 400);
  }
}

export class ExistingError extends BaseError {
  constructor(message?: string) {
    super(message || 'existing error', 404);

  }
}

export class BadRequestError extends BaseError {
  constructor(message?: string) {
    super(message || 'existing error', 400);

  }
}
