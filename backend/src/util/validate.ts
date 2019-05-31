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

type Sanitize<T> = (data: any) => Either<T, Error[]>

type Schema<T> = {
  [K in keyof T]: Sanitize<T[K]>
}

export const sanitize = <T>(schema: Schema<T>) => (req: Request) => {
  let res: T = {} as any

  for (const key in schema) {
    const result = schema[key](req.params[key])
    if (isLeft(result)) {
      res[key] = result.left
    } else {
      throw result.right // TODO: figure it out
    }
  }

  return res
}

export const asString: Sanitize<string> = (data: unknown) => {
  if (typeof data === 'string') return left(data)
  else return right([{ path: '', expected: 'string' }])
}

export const asNumber: Sanitize<number> = (data: unknown) => {
  const val = +(data as any)
  if (!isNaN(val)) return left(val)
  else return right([{ path: '', expected: 'number' }])
}
