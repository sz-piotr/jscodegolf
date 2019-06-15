export function debounceAsync <T extends any[], R>(
  func: (...args: T) => Promise<R>,
  waitMs: number,
) {
  let promise: LazyPromise<R> | null = null
  let timeout: any
	return function (...args: T): Promise<R> {
    if (promise === null) {
      promise = createLazyPromise()
    }
    const saved = promise
		clearTimeout(timeout)
		timeout = setTimeout(() => {
      promise = null
      func(...args).then(
        value => saved.resolve(value),
        error => saved.reject(error),
      )
    }, waitMs)
    return saved
	}
}

type LazyPromise<T> = Promise<T> & {
  resolve: (value: T) => void,
  reject: (reason: any) => void,
}

function createLazyPromise <T> (): LazyPromise<T> {
  let resolve: (value: T) => void = () => {}
  let reject: (reason: any) => void = () => {}
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  }) as LazyPromise<T>
  promise.resolve = resolve
  promise.reject = reject
  return promise
}
