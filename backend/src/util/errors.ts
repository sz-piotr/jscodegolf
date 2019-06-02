import { SanitizeError } from './sanitize'

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
  ) {
    super(message)
  }

  toJson() {
    return {
      code: this.constructor.name,
      status: this.status,
      message: this.message
    }
  }
}

export class InvalidRequest extends ApiError {
  constructor(public errors: SanitizeError[]) {
    super('Invalid request', 400)
  }

  toJson() {
    return {
      ...super.toJson(),
      errors: this.errors,
    }
  }
}

export class NotFound extends ApiError {
  constructor() {
    super('Resource not found', 404)
  }
}
