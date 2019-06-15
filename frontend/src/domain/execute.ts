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

const NO_INPUT_ERROR = {
  type: 'ERROR' as const,
  message: `No input provided`,
}

export async function execute(code: string, tests: TestCase[]) {
  if (code === '') {
    return tests.map(() => NO_INPUT_ERROR)
  }

  const worker = await startWorker()
  worker.postMessage({ code, tests })

  return Promise.race([
    new Promise<TestResult[]>(resolve => {
      function onMessage (event: MessageEvent) {
        resolve(event.data)
        worker.removeEventListener('message', onMessage)
      }
      worker.addEventListener('message', onMessage)
    }),
    new Promise<TestResult[]>(resolve => {
      setTimeout(() => {
        worker.terminate()
        resolve(tests.map(() => TIMEOUT_ERROR))
      }, TIMEOUT_MS)
    }),
  ])
}

async function startWorker () {
  const worker = new Worker()
  return new Promise<Worker>(resolve => {
    function onMessage () {
      resolve(worker)
      worker.removeEventListener('message', onMessage)
    }
    worker.addEventListener('message', onMessage)
  })
}
