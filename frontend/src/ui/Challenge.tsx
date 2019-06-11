import React, { useRef, useEffect, useState, FormEvent } from 'react'
import { Scores } from './Scores'
import { submitSolution, ApiChallenge, ApiScore, getScores } from './api'
import { execute } from './execute'
import styled from 'styled-components'
import { TestCases } from './TestCases';

export interface ChallengeProps {
  challenge: ApiChallenge,
  shouldFocus: boolean,
}

export const Challenge = ({ challenge, shouldFocus }: ChallengeProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

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

  return (
    <div>
      <Description>{challenge.description}</Description>
      <TestCases input={value} tests={challenge.tests} />
      <form onSubmit={onSubmit}>
        <Input
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={pending}
        />
        {error && <ErrorDisplay>{error}</ErrorDisplay>}
      </form>
      <Scores scores={scores} />
    </div>
  )
}

const Description = styled.div`
  white-space: pre-line;
  line-height: 1.4;
`

const Input = styled.input`
  padding: 16px;
  width: 100%;
  margin-top: 1em;
  background-color: #222;
  border: none;
  border-radius: 4px;
  color: white;
  outline: none;
`

const ErrorDisplay = styled.div`
  color: #FC3939;
  font-weight: bold;
  margin-top: 8px;
  white-space: pre-line;
`

const OutputDisplay = styled.div`
  color: #394EFC;
  font-weight: bold;
  margin-top: 8px;
  white-space: pre-line;
`
