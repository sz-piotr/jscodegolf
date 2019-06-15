import { useState, useEffect, useRef, RefObject } from 'react'

export function useAsync<T> (execute: () => Promise<T>, deps: readonly any[]): [T | undefined, any] {
  const [value, setValue] = useState<T | undefined>(undefined)
  const [error, setError] = useState<any>(undefined)
  const nonce = useRef(0)

  useEffect(() => {
    if (value !== undefined) {
      setValue(undefined)
    }
    if (error !== undefined) {
      setError(undefined)
    }

    const executionId = ++nonce.current
    execute().then(
      result => nonce.current === executionId && setValue(result),
      setError,
    )
    return () => { ++nonce.current }
  }, deps)

  return [value, error]
}
