import React, { useRef, useEffect, useState, FormEvent } from 'react'
import { Scores } from './Scores'
import { submitSolution, ApiChallenge, ApiScore, getScores } from './api'
import { execute } from './execute';

export interface ChallengeProps {
  challenge: ApiChallenge,
  shouldFocus: boolean,
}

export const Challenge = ({ challenge, shouldFocus }: ChallengeProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [output, setOutput] = useState('')

  const [scores, setScores] = useState<ApiScore[] | undefined>(undefined)

  useEffect(() => {
    if (ref.current) {
      ref.current.spellcheck = false
    }
  }, [])

  useEffect(() => {
    getScores(challenge.id).then(setScores)
    return () => setScores(undefined)
  }, [challenge.id])

  useEffect(() => {
    if (challenge && shouldFocus && ref.current) {
      ref.current.focus()
      setValue('')
      setError('')
    }
  }, [challenge, shouldFocus])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setPending(true)
    try {
      const result = await submitSolution(challenge.id, value)
      if (result.success) {
        setScores(result.scores)
        setValue('')
        setError('')
      } else {
        setError(result.error)
      }
    } finally {
      setPending(false)
      ref.current && ref.current.focus()
    }
  }

  useEffect(() => {
    setError('')
    setOutput('')
    if (value !== '') {
      try {
        setOutput(JSON.stringify(execute(value, challenge.example)))
      } catch (err) {
        setError(err.message)
      }
    }
  }, [value])

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
        {error && <div className="challenge-error">{error}</div>}
        {output && <div className="challenge-output">
          <span>fn({challenge.example.map(x => JSON.stringify(x)).join(', ')}) = </span>
          {output}
        </div>}
      </form>
      <Scores scores={scores} />
    </div>
  )
}
