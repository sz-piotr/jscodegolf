import { Request, Response } from "express";

type HandlerStep<T, U> = (data: T, req: Request, res: Response) => U | Promise<U>

interface AsyncHandlerFn {
  <T1>(
    fn1: HandlerStep<never, T1>,
  ): (req: Request, res: Response) => Promise<void>
  <T1, T2>(
    fn1: HandlerStep<never, T1>,
    fn2: HandlerStep<T1, T2>,
  ): (req: Request, res: Response) => Promise<void>
}

export const asyncHandler: AsyncHandlerFn = (first: HandlerStep<never, any>, ...handlers: HandlerStep<any, any>[]) =>
  async (req: Request, res: Response) => {
    try {
      const result = await asyncReduce(
        (data, handler) => handler(data, req, res),
        handlers,
        first(undefined as never, req, res),
      )
      res.json(result)
    } catch (err) {
      res.status(500).json({
        error: err.message,
      })
    }
  }

const asyncReduce = async <T, U>(reducer: (acc: U, item: T) => Promise<U>, items: T[], initial: U) => {
  let acc = initial
  for (const item of items) {
    acc = await reducer(acc, item)
  }
  return acc
}
