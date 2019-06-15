import { TestCase } from './api'
import Worker from 'worker-loader!./worker'

export type TestResult
  = { type: 'PASS' }
  | { type: 'FAIL', result: any }
  | { type: 'ERROR', message: string }

const TIMEOUT_MS = 100
const TIMEOUT_ERROR = {
  type: 'ERROR' as const,
  message: `Timeout: Execution exceeded ${TIMEOUT_MS}ms`,
}

export async function execute(code: string, tests: TestCase[]) {
  const worker = new Worker()
  worker.postMessage({ code, tests })
  return Promise.race([
    new Promise<TestResult[]>(resolve => {
      worker.addEventListener("message", (event) => resolve(event.data))
    }),
    new Promise<TestResult[]>(resolve => {
      setTimeout(() => {
        worker.terminate()
        resolve(tests.map(() => TIMEOUT_ERROR))
      }, TIMEOUT_MS)
    }),
  ])
}
