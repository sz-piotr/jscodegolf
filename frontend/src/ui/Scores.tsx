import React from 'react'
import { ApiScore } from '../domain/api'

export interface ScoresProps {
  scores?: ApiScore[]
}

export const Scores = ({ scores }: ScoresProps) => (
  <>
    <ol>
      {scores && scores.map((entry, index) => (
        <li key={index}>
          <span>{entry.player} </span>
          <span>({entry.score})</span>
        </li>
      ))}
    </ol>
    {scores && scores.length === 0 && (
      <div>There are no scores</div>
    )}
  </>
)
