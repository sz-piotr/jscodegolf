import React from 'react'
import { useAsync } from './hooks'
import { getScores } from './api'

export interface ScoresProps {
  challengeId: number
}

export function Scores ({ challengeId }: ScoresProps) {
  const [scores] = useAsync(() => getScores(challengeId), [challengeId])

  return (
    <div className="scores">
      {JSON.stringify(scores)}
    </div>
  )
}
