import { Request } from "express";

type Schema<T> = {
  [K in keyof T]: Validator<T[K]>
}

export const validate = <T>(schema: Schema<T>) => (_: never, req: Request) => {
  let res: T = {} as any

  for (const key in schema) {
    res[key] = schema[key](req.params[key])
  }

  return res
}

type Validator<T> = (data: any) => T


export const validateString: Validator<string> = (data: any) => {
  if (typeof data === 'string') return data
  else throw new Error('Validation error')
}

export const validateNumber: Validator<number> = (data: any) => {
  const val = +data
  if (!isNaN(val)) return val
  else throw new Error('Validation error')
}
