import evel from 'evel'

export function execute(code: string, args: any[]) {
  return evel(`(${code})(${args.map(a => JSON.stringify(a)).join(',')})`)
}
