import React from 'react'
import { ApiScore } from './api'

export interface ScoresProps {
  scores?: ApiScore[]
}

export const Scores = ({ scores }: ScoresProps) => (
  <>
    <ol className="scores">
      {scores && scores.map((entry, index) => (
        <li className="scores-entry" key={index}>
          <span className="scores-name">{entry.player} </span>
          <span className="scores-score">({entry.score})</span>
        </li>
      ))}
    </ol>
    {scores && scores.length === 0 && (
      <div className="scores-empty">There are no scores</div>
    )}
  </>
)
