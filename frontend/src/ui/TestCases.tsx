import React from 'react'
import styled from 'styled-components'
import { TestCase } from '../domain/api'
import { execute } from '../domain/execute'
import { useAsync, useLastNotUndefined } from './hooks'

export interface TestCasesProps {
  tests: TestCase[]
  input: string
}

export function TestCases({ tests, input }: TestCasesProps) {
  const [rawResult] = useAsync(() => execute(input, tests), [input, tests])
  const result = useLastNotUndefined(rawResult)

  const successes = result ? result.filter(x => x.type === 'PASS').length : '?'

  return (
    <>
      <Successes>
        {successes}/{tests.length} checks successful
      </Successes>
      <Items>
        {tests.map((testCase, i) => {
          const out = result && result[i]
          return (
            <li key={i}>
              {out && out.type === 'FAIL' && <Fail>FAIL</Fail>}
              {out && out.type === 'ERROR' && <Fail>ERROR</Fail>}
              {out && out.type === 'PASS' && <Pass>PASS</Pass>}
              {!out && <Fail>????</Fail>}
              <span>{formatTestCase(testCase)}</span>
              {out && out.type === 'FAIL' && <Error>{JSON.stringify(out.result)}</Error>}
              {out && out.type === 'ERROR' && <Error>{out.message}</Error>}
            </li>
          )
        })}
      </Items>
    </>
  )
}

function formatTestCase({ args, expected }: TestCase) {
  return `fn(${args.map(x => JSON.stringify(x)).join(', ')}) = ${JSON.stringify(expected)}`
}

const Successes = styled.div`
  margin-top: 20px;
  margin-bottom: 8px;
`

const Items = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const Fail = styled.span`
  padding: 2px 8px;
  background-color: #bb2c2c;
  color: #FFFFFF;
  font-weight: bold;
  margin-right: 16px;
`

const Pass = styled.span`
  padding: 2px 8px;
  background-color: #60bb3a;
  color: #FFFFFF;
  font-weight: bold;
  margin-right: 16px;
`

const Error = styled.div`
  color: #bb2c2c;
`
