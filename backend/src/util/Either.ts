export type Either<L, R> = { left: L } | { right: R }

export const left = <L> (left: L) => ({ left })

export const right = <R> (right: R) => ({ right })

export function isLeft<L> (value: Either<L, any>): value is { left: L } {
  return Object.hasOwnProperty.call(value, 'left')
}

export function isRight<R> (value: Either<any, R>): value is { right: R } {
  return Object.hasOwnProperty.call(value, 'right')
}
