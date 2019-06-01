import { SanitizeError } from './sanitize'

export class InvalidRequest extends TypeError {
  constructor (public errors: SanitizeError[]) {
    super('Invalid request')
  }
}
