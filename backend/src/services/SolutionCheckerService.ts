import vm from 'vm'
import { Challenge, TestCase } from "src/challenges/Challenge"

export class SolutionCheckerService {
  check(code: string, challenge: Challenge): boolean {
    return challenge.tests.every(test => checkTestCase(code, test))
  }
}

function checkTestCase(code: string, test: TestCase): boolean {
  const result = executeSolution(code, test.args)
  console.log(test.args, result, test.expected)
  return deepEqual(result, test.expected)
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

function executeSolution(code: string, args: any[]): any {
  const sandbox = { result: undefined, args };
  vm.createContext(sandbox);

  vm.runInContext(`result = (${code})(...args)`, sandbox);

  return sandbox.result
}
