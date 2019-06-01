import { Request } from 'express'
import { Either, isLeft, right, left } from './Either'
import { InvalidRequest } from './errors';

export type ValidationError = { path: string, expected: string }

type Sanitize<T> = (data: unknown, path: string) => Either<T, ValidationError[]>

type Schema<T> = {
  [K in keyof T]: Sanitize<T[K]>
}

export const sanitize = <T>(schema: Schema<T>) => (req: Request) => {
  const sanitized: T = {} as any
  for (const key in schema) {
    let result
    if (key === 'body') {
      result = schema[key](req.body, 'body')
    } else if (key === 'query') {
      result = schema[key](req.query, 'query')
    } else {
      result = schema[key](req.params[key], `params.${key}`)
    }
    if (isLeft(result)) {
      sanitized[key] = result.left
    } else {
      throw new InvalidRequest(result.right)
    }
  }
  return sanitized
}

export const asObject = <T extends object> (schema: Schema<T>): Sanitize<T> =>
  function (data, path) {
    if (typeof data !== 'object' || data === null) {
      return right([{ path: '', expected: 'object' }])
    }
    const value: T = {} as any
    const errors: ValidationError[] = []
    for (const key in schema) {
      const result = schema[key]((data as T)[key], `${path}.${key}`)
      if (isLeft(result)) {
        value[key] = result.left
      } else {
        errors.push(...result.right)
      }
    }
    if (errors.length > 0) {
      return right(errors)
    }
    return left(value)
  }

export const asString: Sanitize<string> = (data, path) => {
  if (typeof data === 'string') return left(data)
  else return right([{ path, expected: 'string' }])
}

export const asNumber: Sanitize<number> = (data, path) => {
  const val = +(data as any)
  if (!isNaN(val)) return left(val)
  else return right([{ path, expected: 'number' }])
}
