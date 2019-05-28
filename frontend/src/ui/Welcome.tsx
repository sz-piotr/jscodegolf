import React, { useState, FormEvent, useEffect } from 'react'
import cx from 'classnames'

export interface WelcomeProps {
  name: string | null
  onLogin: (name: string) => void
}

export function Welcome (props: WelcomeProps) {
  const visible = !props.name
  const [name, setName] = useState(props.name || '')

  useEffect(() => {
    if (visible) {
      setName('')
    }
  }, [visible])

  function onSubmit (e: FormEvent) {
    e.preventDefault()
    if (name !== '') {
      props.onLogin(name)
    }
  }

  return (
    <div className={cx('welcome', !visible && 'hidden')}>
      <h1 className="welcome-title">
        <span>Welcome to</span>
        <span>JS Code Golf</span>
      </h1>
      <form className="welcome-form" onSubmit={onSubmit}>
        <label
          className="welcome-label"
          htmlFor="name"
        >
          Enter your name
        </label>
        <input
          className="welcome-input"
          name="name"
          value={name}
          disabled={!visible}
          onChange={e => setName(e.target.value)}
        />
        <button className="welcome-button" disabled={!visible}>Enter</button>
      </form>
    </div>
  )
}
