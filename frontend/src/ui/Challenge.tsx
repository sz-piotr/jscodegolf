import React, { useRef, useEffect, useState, FormEvent } from 'react'
import { Scores } from './Scores'
import { submitSolution, ApiChallenge, ApiScore, getScores } from './api'

export interface ChallengeProps {
  challenge: ApiChallenge,
  shouldFocus: boolean,
}

export const Challenge = ({ challenge, shouldFocus }: ChallengeProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [pending, setPending] = useState(false)

  const [scores, setScores] = useState<ApiScore[] | undefined>(undefined)

  useEffect(() => {
    getScores(challenge.id).then(setScores)
    return () => setScores(undefined)
  }, [challenge.id])

  useEffect(() => {
    if (challenge && shouldFocus && ref.current) {
      ref.current.focus()
      setValue('')
    }
  }, [challenge, shouldFocus])

  async function onSubmit (e: FormEvent) {
    e.preventDefault()
    setPending(true)
    try {
      const result = await submitSolution(challenge.id, value)
      if (result.success) {
        setScores(result.scores)
        setValue('')
      }
    } finally {
      setPending(false)
      ref.current && ref.current.focus()
    }
  }

  return (
    <div className="challenge">
      <div className="challenge-description">{challenge.description}</div>
      <form onSubmit={onSubmit}>
        <input
          className="challenge-input"
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={pending}
        />
      </form>
      <Scores scores={scores} />
    </div>
  )
}
