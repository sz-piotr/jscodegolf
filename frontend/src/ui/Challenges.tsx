import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { useAsync } from './hooks'
import { getChallenges } from './api'
import { Scores } from './Scores'

export function Challenges () {
  const ref = useRef<HTMLInputElement>(null)
  const [challenges] = useAsync(getChallenges, [])
  const [selected, setSelected] = useState(0)
  const challenge = challenges && challenges.find(({ id }) => id === selected)

  useEffect(() => {
    if (challenge && ref.current) {
      ref.current.focus()
    }
  }, [challenge])

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
      {challenge && (
        <div className="challenge">
          <div className="challenge-description">{challenge.description}</div>
          <input ref={ref} className="challenge-input" />
          <Scores challengeId={challenge.id} />
        </div>
      )}
    </div>
  )
}
