import { useState, useEffect } from 'react'

export function useAsync<T> (execute: () => Promise<T>, deps: readonly any[]): [T | undefined, any] {
  const [value, setValue] = useState<T | undefined>(undefined)
  const [error, setError] = useState<any>(undefined)

  useEffect(() => {
    execute().then(
      // This prevents async effects finishing after the component was
      // unmounted from generating warnings
      result => result !== undefined && setValue(result),
      setError,
    )
    return () => setValue(undefined)
  }, deps)

  return [value, error]
}
