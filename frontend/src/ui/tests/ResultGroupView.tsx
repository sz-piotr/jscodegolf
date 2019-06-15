import React, { useState } from 'react'
import styled from 'styled-components'
import { ResultGroup, ResultGroupItem } from 'src/domain/groupResults'
import { prettyPrint } from 'src/domain/prettyPrint'

export interface ResultGroupViewProps {
  group: ResultGroup
}

export function ResultGroupView({ group }: ResultGroupViewProps) {
  const [collapse, setCollapse] = useState(true)

  if (group.items.length === 1) {
    return (
      <li>
        <Badge pass={group.type === 'PASS'}>{getTypeName(group.type)}</Badge>
        <span>{getMessage(group.items[0])}</span>
      </li>
    )
  }

  return (
    <li>
      <Badge pass={group.type === 'PASS'}>{getTypeName(group.type)}</Badge>
      <span>{group.message}</span>
      <CollapseButton onClick={() => setCollapse(!collapse)}>
        {collapse ? 'Show' : 'Collapse'} {group.items.length} items
      </CollapseButton>
      {!collapse && (
        <Items>
          {group.items.map((item, i) =>
            <Item key={i}>
              <Badge pass={item.result.type === 'PASS'}>
                {getTypeName(item.result.type)}
              </Badge>
              <span>{getMessage(item)}</span>
            </Item>
          )}
        </Items>
      )}
    </li>
  )
}

function getTypeName (type: string) {
  return type === 'PASS' ? 'Pass' : 'Fail'
}

function getMessage({ test, result }: ResultGroupItem) {
  const call = formatCall(test.args)
  if (result.type === 'PASS') {
    return `${call} = ${prettyPrint(test.expected)}`
  } else if (result.type === 'FAIL') {
    return `${call} Expected ${prettyPrint(test.expected)}, ` +
      `got ${prettyPrint(result.result)}`
  } else {
    return `${call} ${result.message}`
  }
}

function formatCall(args: any[]) {
  return `fn(${args.map(x => prettyPrint(x)).join(', ')})`
}

const Badge = styled.span<{ pass: boolean }>`
  padding: 2px 8px;
  background-color: ${({ pass }) => pass ? '#60bb3a' : '#bb2c2c'};
  color: #FFFFFF;
  font-weight: bold;
  margin-right: 16px;
  text-transform: uppercase;
  align-self: flex-start;
`

const CollapseButton = styled.button`
  padding: 0;
  margin-left: 16px;
  background: none;
  border: none;
  outline: none;
  color: #777;
  text-decoration: underline;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
`

const Items = styled.ul`
  list-style-type: none;
  margin: 16px 0;
  padding-left: 16px;
`

const Item = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
`
