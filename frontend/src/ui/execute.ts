import evel from 'evel'

export function execute(code: string, args: any[]) {
  const fn = evel(code)
  return fn(...args)
}
