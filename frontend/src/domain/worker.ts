import nonStrictEvalUrl from 'file-loader!./eval.js'
import { TestCase, FunctionTestCase, RegexTestCase } from './challenge'

importScripts(nonStrictEvalUrl)
declare function nonStrictEval (code: string): any

const ctx: Worker = self as any

ctx.postMessage('STARTED')

ctx.addEventListener('message', (event) => {
  const result = execute(event.data)
  ctx.postMessage(result)
})

interface Submission {
  code: string,
  tests: TestCase[]
}

function execute ({ code, tests }: Submission) {
  return tests.map(test => {
    if (test.type === 'FUNCTION') {
      return checkFunction(code, test)
    } else if (test.type === 'REGEX') {
      return checkRegex(code, test)
    } else if (test.type === 'VALUE') {
      return checkValue(code, test.expected)
    } else {
      return { type: 'ERROR', message: 'Unknown test' }
    }
  })
}

function checkFunction (code: string, { args, expected }: FunctionTestCase) {
  const input = args.map(x => JSON.stringify(x)).join(', ')
  return checkEqual(() => nonStrictEval(`(${code})(${input})`), expected)
}

function checkRegex (code: string, { expected, flags }: RegexTestCase) {
  const re = new RegExp(expected, flags)
  if (re.test(code)) {
    return { type: 'PASS' }
  } else {
    return { type: 'ERROR', message: `Input does not match ${re}` }
  }
}

function checkValue (code: string, expected: any) {
  return checkEqual(() => nonStrictEval(`(${code})`), expected)
}

function checkEqual (fn: () => any, expected: any) {
  try {
    const result = fn()
    if (deepEqual(result, expected)) {
      return { type: 'PASS' }
    } else {
      return { type: 'FAIL', result }
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      return { type: 'ERROR', message: 'SyntaxError' }
    }
    return { type: 'ERROR', message: '' + e }
  }
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
