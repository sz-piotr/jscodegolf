import vm from 'vm'
import { Challenge, TestCase } from 'src/challenges/Challenge'

export class SolutionCheckerService {
  check(code: string, challenge: Challenge): boolean {
    return challenge.tests.every(test => checkTestCase(code, test))
  }
}

function checkTestCase(code: string, test: TestCase): boolean {
  try {
    if (test.type === 'REGEX') {
      return new RegExp(test.expected, test.flags).test(code)
    }

    if (test.type === 'VALUE') {
      return deepEqual(evaluate(`(${code})`), test.expected)
    }

    return deepEqual(executeSolution(code, test.args), test.expected)
  } catch {
    return false
  }
}

function executeSolution(code: string, args: any[]): any {
  return evaluate(`(${code})(${args.map(x => JSON.stringify(x)).join(',')})`)
}

function evaluate (code: string) {
  return vm.runInNewContext(code, {}, { timeout: 50 })
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
