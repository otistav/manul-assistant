/* eslint-disable max-classes-per-file */
export class BaseError extends Error {
}

export class ValidationError extends BaseError {
  constructor(message?: string) {
    super(message);
    this.message = message || 'validation error';
  }
}
