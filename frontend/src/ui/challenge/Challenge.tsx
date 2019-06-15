import React, { useRef, useEffect, useState, FormEvent } from 'react'
import styled from 'styled-components'
import { ApiChallenge } from '../../domain/api'
import { Scores } from '../Scores'
import { TestCases } from '../tests/TestCases'
import { useAsync } from '../hooks'
import { execute } from 'src/domain/execute'
import { debounceAsync } from 'src/util/debounceAsync'
import { useChallenge } from './useChallenge'

const executeDebounced = debounceAsync(execute, 200)

export interface ChallengeProps {
  challenge: ApiChallenge
}

export const Challenge = ({ challenge }: ChallengeProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [lastSubmitted, setLastSubmitted] = useState('')
  const { scores, submit, pending, error } = useChallenge(challenge.id, value)

  const [results] = useAsync(
    () => executeDebounced(value, challenge.tests),
    [value, challenge.tests],
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
      ref.current.spellcheck = false
    }
  }, [])

  const shouldSubmit = !error && value !== lastSubmitted &&
    results && results.every(x => x.type === 'PASS')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!shouldSubmit) {
      return
    }
    setLastSubmitted(value)
    await submit(value)
    ref.current && ref.current.focus()
  }

  return (
    <div>
      <Description>{challenge.description}</Description>
      <Form onSubmit={onSubmit}>
        <Input
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={pending}
        />
        <Length>{value.length}</Length>
        {shouldSubmit &&
          <ShouldSubmit>All green! Press Enter to submit.</ShouldSubmit>
        }
        {error && <ErrorDisplay>{error}</ErrorDisplay>}
      </Form>
      <TestCases results={results} tests={challenge.tests} />
      <Scores scores={scores} />
    </div>
  )
}

const Description = styled.div`
  white-space: pre-line;
  line-height: 1.4;
  margin-bottom: 16px;
`

const Form = styled.form`
  position: relative;
`

const Input = styled.input`
  padding: 16px 56px 16px 16px;
  width: 100%;
  background-color: #222;
  border: none;
  border-radius: 4px;
  color: white;
  outline: none;
`

const Length = styled.div`
  position: absolute;
  right: 16px;
  top: 15px;
  color: #ffd400;
  font-weight: bold;
`

const ErrorDisplay = styled.div`
  color: #FC3939;
  font-weight: bold;
  margin-top: 8px;
  white-space: pre-line;
`

const ShouldSubmit = styled.div`
  color: #60bb3a;
  font-weight: bold;
  margin-top: 8px;
`
