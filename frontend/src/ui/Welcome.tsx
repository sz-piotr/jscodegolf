import React, { useState, FormEvent } from 'react'
import cx from 'classnames'

const readName = () => localStorage.getItem('name')
const writeName = (value: string) => localStorage.setItem('name', value)

export function Welcome () {
  const [visible, setVisible] = useState(() => !readName())
  const [name, setName] = useState(() => readName() || '')

  function onSubmit (e: FormEvent) {
    e.preventDefault()
    setVisible(false)
    writeName(name)
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
