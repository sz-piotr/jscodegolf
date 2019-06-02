import { Request, Response, NextFunction } from 'express'
import { InvalidRequest, ApiError } from './errors'

function getMessage(error: any) {
  if (error && typeof error.message === 'string') {
    return error.message.substring(0, 1000)
  }
  return 'Unkown error'
}

function preprocess(error: unknown) {
  if (error instanceof ApiError) {
    return error.toJson()
  }
  return {
    status: 500,
    message: getMessage(error)
  }
}


export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const error = preprocess(err)
  res.status(error.status)
  res.send(error)
}
