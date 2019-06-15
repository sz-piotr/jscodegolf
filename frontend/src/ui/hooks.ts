import { useState, useEffect, useRef } from 'react'

export function useAsync<T> (execute: () => Promise<T>, deps: readonly any[]): [T | undefined, any] {
  const [value, setValue] = useState<T | undefined>(undefined)
  const [error, setError] = useState<any>(undefined)
  const nonce = useRef(0)

  useEffect(() => {
    const executionId = ++nonce.current
    execute().then(
      result => {
        if (nonce.current === executionId) {
          setValue(result)
        }
      },
      setError,
    )
    return () => {
      setValue(undefined)
      nonce.current++
    }
  }, deps)

  return [value, error]
}

export function useLastNotUndefined <T> (value: T): T {
  const [last, setLast] = useState<T>(value)
  useEffect(() => {
    if (value !== undefined && last !== value) {
      setLast(value)
    }
  }, [value])
  return last
}
