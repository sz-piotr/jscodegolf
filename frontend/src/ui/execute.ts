import { TestCase } from './api'

export type TestResult
  = { type: 'PASS' }
  | { type: 'FAIL', error: string }

export type ExecutionResult
  = { type: 'PASS' }
  | { type: 'ERROR', error: string }
  | { type: 'FAIL', results: TestResult[] }

export function execute(code: string, tests: TestCase[]): ExecutionResult {
  let fun;

  try {
    fun = eval(code)
  } catch (e) {
    return { type: 'ERROR', error: `${e}` }
  }

  if (!fun || typeof fun !== 'function') {
    return { type: 'ERROR', error: `Your solution should be a function. You entered: ${typeof fun}` }
  }

  const results = tests.map((test): TestResult => {
    try {
      const value = eval(`fun(...test.args)`)
      if (!deepEqual(value, test.expected)) {
        throw new Error(`Invalid return value: ${JSON.stringify(value)}`)
      }
      return { type: 'PASS' }
    } catch (e) {
      return { type: 'FAIL', error: '' + e }
    }
  })

  return { type: 'FAIL', results }
}

function deepEqual(value: any, expected: any): boolean {
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
