import React, { useState } from 'react'
import cx from 'classnames'
import { useAsync } from './hooks'
import { getChallenges } from './api'
import { Challenge } from './Challenge';

export interface ChallengesProps {
  shouldFocus: boolean
}

export function Challenges ({ shouldFocus }: ChallengesProps) {
  const [challenges] = useAsync(getChallenges, [])
  const [selected, setSelected] = useState(0)
  const challenge = challenges && challenges.find(({ id }) => id === selected)

  return (
    <div className="challenges">
      <ul className="challenges-list">
        {challenges && challenges.map(challenge => (
          <li
            className={cx('challenges-item', challenge.id === selected && 'selected')}
            key={challenge.id}
          >
            <button onClick={() => setSelected(challenge.id)}>{challenge.title}</button>
          </li>
        ))}
      </ul>
      {challenge && <Challenge challenge={challenge} shouldFocus={shouldFocus} />}
    </div>
  )
}
