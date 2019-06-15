import React, { useRef } from 'react'
import styled from 'styled-components'
import { TestCase } from 'src/domain/api'
import { TestResult } from 'src/domain/execute'
import { groupResults } from 'src/domain/groupResults'
import { ResultGroupView } from './ResultGroupView'

export interface TestCasesProps {
  tests: TestCase[]
  results?: TestResult[]
}

export function TestCases({ tests, results }: TestCasesProps) {
  const latest = useLastNotUndefined(results)
  const groups = latest && groupResults(tests, latest)

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
