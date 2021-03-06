import { useState, useEffect } from 'react'
import { ApiScore, getScores, submitSolution } from 'src/domain/api'

export function useChallenge (id: string, value: string) {
  const [scores, setScores] = useState<ApiScore[] | undefined>(undefined)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (error !== '') {
      setError('')
    }
  }, [value])

  useEffect(() => {
    if (scores !== undefined) {
      setScores(undefined)
    }
    getScores(id).then(setScores)
  }, [id])

  async function submit (value: string) {
    if (pending) {
      return
    }
    setPending(true)
    setError('')
    try {
      const result = await submitSolution(id, value)
      if (result.success) {
        setScores(result.scores)
        return true
      } else {
        setError(result.error)
        return false
      }
    } finally {
      setPending(false)
    }
  }

  return {
    pending,
    error,
    submit,
    scores,
  }
}
