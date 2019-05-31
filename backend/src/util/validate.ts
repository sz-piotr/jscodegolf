import { Request } from "express";

type Either<L, R> = { left: L } | { right: R }
const left = <L> (left: L) => ({ left })
const right = <R> (right: R) => ({ right })
function isLeft<L> (value: Either<L, any>): value is { left: L } {
  return Object.hasOwnProperty.call(value, 'left')
}
function isRight<R> (value: Either<any, R>): value is { right: R } {
  return Object.hasOwnProperty.call(value, 'right')
}

type Error = { path: string, expected: string }

type Sanitize<T> = (data: unknown, path: string) => Either<T, Error[]>

type Schema<T> = {
  [K in keyof T]: Sanitize<T[K]>
}

export const sanitize = <T>(schema: Schema<T>) => (req: Request) => {
  const sanitized: T = {} as any
  for (const key in schema) {
    let result
    if (key === 'body') {
      result = schema[key](req.body, 'body')
    } else {
      result = schema[key](req.params[key], `params.${key}`)
    }
    if (isLeft(result)) {
      sanitized[key] = result.left
    } else {
      throw result.right // TODO: figure it out
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
    const errors: Error[] = []
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
