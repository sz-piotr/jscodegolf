import React from 'react'
import { useAsync } from './hooks'
import { getScores } from './api'

export interface ScoresProps {
  challengeId: number
}

export function Scores ({ challengeId }: ScoresProps) {
  const [scores] = useAsync(() => getScores(challengeId), [challengeId])

  return (
    <>
      <ol className="scores">
        {scores && scores.map((entry, index) => (
          <li className="scores-entry" key={index}>
            <span className="scores-name">{entry.name} </span>
            <span className="scores-score">({entry.score})</span>
          </li>
        ))}
      </ol>
      {scores && scores.length === 0 && (
        <div className="scores-empty">There are no scores</div>
      )}
    </>
  )
}
