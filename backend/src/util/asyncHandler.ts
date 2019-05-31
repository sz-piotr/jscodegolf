import { RequestHandler, Request } from "express";

type Fn<T, U> = (data: T) => U | Promise<U>

type Result = any

export function asyncHandler (a: Fn<Request, Result>): RequestHandler
export function asyncHandler <A>(
  a: Fn<Request, A>,
  b: Fn<A, Result>,
): RequestHandler
export function asyncHandler <A, B>(
  a: Fn<Request, A>,
  b: Fn<A, B>,
  c: Fn<B, Result>,
): RequestHandler
export function asyncHandler <A, B, C>(
  a: Fn<Request, A>,
  b: Fn<A, B>,
  c: Fn<B, C>,
  d: Fn<C, Result>,
): RequestHandler
export function asyncHandler <A, B, C, D>(
  a: Fn<Request, A>,
  b: Fn<A, B>,
  c: Fn<B, C>,
  d: Fn<C, D>,
  e: Fn<D, Result>,
): RequestHandler
export function asyncHandler <A, B, C, D, E>(
  a: Fn<Request, A>,
  b: Fn<A, B>,
  c: Fn<B, C>,
  d: Fn<C, D>,
  e: Fn<D, E>,
  f: Fn<E, Result>,
): RequestHandler
export function asyncHandler (...handlers: Fn<any, any>[]): RequestHandler {
  return async (req, res, next) => {
    try {
      const result = await asyncReduce(
        handlers,
        (data, handler) => handler(data),
        req,
      )
      res.json(result)
      next()
    } catch (err) {
      next(err)
    }
  }
}

const asyncReduce = async <T, U>(
  items: T[],
  reducer: (acc: U, item: T) => Promise<U>,
  initial: U,
) => {
  let acc = initial
  for (const item of items) {
    acc = await reducer(acc, item)
  }
  return acc
}
