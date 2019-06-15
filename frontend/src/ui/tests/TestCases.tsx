import React, { useRef } from 'react'
import styled from 'styled-components'
import { TestCase } from 'src/domain/api'
import { execute } from 'src/domain/execute'
import { groupResults } from 'src/domain/groupResults'
import { useAsync } from '../hooks'
import { debounceAsync } from 'src/util/debounceAsync'
import { ResultGroupView } from './ResultGroupView'

export interface TestCasesProps {
  tests: TestCase[]
  input: string
}

const executeDebounced = debounceAsync(execute, 200)

export function TestCases({ tests, input }: TestCasesProps) {
  const [rawResults] = useAsync(() => executeDebounced(input, tests), [input, tests])
  const results = useLastNotUndefined(rawResults)
  const groups = results && groupResults(tests, results)

  return (
    <Groups>
      {groups && groups.map((group, i) =>
        <ResultGroupView group={group} key={`${i}${group.message}`} />
      )}
    </Groups>
  )
}

export function useLastNotUndefined <T> (value: T): T | undefined {
  const last = useRef<T | undefined>(value)
  if (value !== undefined && last.current !== value) {
    last.current = value
  }
  return last.current
}


const Groups = styled.ul`
  list-style-type: none;
  margin: 20px 0 8px 0;
  padding: 0;
`
