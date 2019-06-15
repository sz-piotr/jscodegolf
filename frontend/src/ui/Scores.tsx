import React from 'react'
import { ApiScore } from '../domain/api'
import styled from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export interface ScoresProps {
  scores?: ApiScore[]
}

export const Scores = ({ scores }: ScoresProps) => (
  <>
    <ol>
      {scores && scores.map((entry, index) => (
        <Entry key={index}>
          <span>{entry.player} </span>
          <span>({entry.score}) </span>
          <Time>{dayjs(entry.time).fromNow()}</Time>
        </Entry>
      ))}
    </ol>
    {scores && scores.length === 0 && (
      <div>There are no scores</div>
    )}
  </>
)

const Time = styled.span`
  color: #777;
  font-size: 0.8em;
  text-transform: uppercase;
`

const Entry = styled.li`
  &:nth-child(1) > *:nth-child(1) {
    font-size: 1.3rem;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    font-weight: bold
  }
`
