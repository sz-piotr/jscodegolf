import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TestCase } from './api'
import { ExecutionResult, execute } from './execute';

export interface TestCasesProps {
  tests: TestCase[]
  input: string
}

export function TestCases ({ tests, input }: TestCasesProps) {
  const [output, setOutput] = useState<ExecutionResult[]>([])

  useEffect(() => {
    setOutput(execute(input, tests))
  }, [tests, input])

  const successes = output.filter(x => x.type === 'PASS').length

  return (
    <>
      <Successes>
        {successes}/{tests.length} checks successful
      </Successes>
      <Items>
        {tests.map((testCase, i) => {
          const out = output[i]
          return (
            <li key={i}>
              {out && out.type === 'FAIL' && <Fail>FAIL</Fail>}
              {out && out.type === 'PASS' && <Pass>PASS</Pass>}
              {!out && <Pass>????</Pass>}
              <span>{formatTestCase(testCase)}</span>
              {out && out.type === 'FAIL' && <div>{out.error}</div>}
            </li>
          )
        })}
      </Items>
    </>
  )
}

function formatTestCase ({ args, expected }: TestCase) {
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