import nonStrictEvalUrl from 'file-loader!./eval.js'

importScripts(nonStrictEvalUrl)
declare function nonStrictEval (code: string): any

const ctx: Worker = self as any

ctx.postMessage('STARTED')

ctx.addEventListener("message", (event) => {
  const result = execute(event.data)
  ctx.postMessage(result)
})

interface Submission {
  code: string,
  tests: {
    args: any[],
    expected: any,
  }[]
}

function execute ({ code, tests }: Submission) {
  return tests.map(({ args, expected }) => {
    const input = args.map(x => JSON.stringify(x)).join(', ')
    try {
      const result = nonStrictEval(`(${code})(${input})`)
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
  })
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
