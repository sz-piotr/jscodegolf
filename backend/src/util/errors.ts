import { ValidationError } from './validate'

export class InvalidRequest extends TypeError {
  constructor (public errors: ValidationError[]) {
    super('Invalid request')
  }
}
