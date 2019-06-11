import { TestCase } from './api'

export type ExecutionResult
  = { type: 'PASS' }
  | { type: 'FAIL', error: string }

export function execute(code: string, tests: TestCase[]) {
  return tests.map((test): ExecutionResult => {
    try {
      const value = eval(`(${code})(...test.args)`)
      if (!deepEqual(value, test.expected)) {
        throw new Error('Invalid return value')
      }
      return { type: 'PASS' }
    } catch (e) {
      return { type: 'FAIL', error: '' + e }
    }
  })
}

function deepEqual (value: any, expected: any): boolean {
  if (value === expected) {
    return true
  }
  if (Array.isArray(expected)) {
    if (!Array.isArray(value) || expected.length !== value.length) {
      return false
    }
    return expected.every((x, i) => deepEqual(value[i], x))
  }
  return false
}
