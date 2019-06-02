import vm from 'vm'
import { Challenge, TestCase } from "src/challenges/Challenge"

export class SolutionCheckerService {
  check(code: string, challenge: Challenge): boolean {
    return challenge.tests.every(test => checkTestCase(code, test))
  }
}

function checkTestCase(code: string, test: TestCase): boolean {
  const result = executeSolution(code, test.args)
  return compareResults(result, test.expected)
}

function compareResults(actual: any, expected: any): boolean {
  // TODO: implement this
  return true
}

function executeSolution(code: string, args: any[]): any {
  const sandbox = { result: undefined, args };
  vm.createContext(sandbox);

  vm.runInContext(`result = (${code})(args)`, sandbox);

  return sandbox.result
}
