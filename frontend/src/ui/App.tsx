import React, { useState, useRef } from 'react'
import { Welcome } from './Welcome'
import { Challenges } from './Challenges'
import { Navbar } from './Navbar'

export function App () {
  const [name, setName] = useState(() => localStorage.getItem('name') || '')

  function onLogin (newName: string) {
    setName(newName)
    localStorage.setItem('name', newName)
  }

  function onLogout () {
    setName('')
    localStorage.removeItem('name')
  }

  const key = useLastNonEmpty(name)

  return (
    <>
      <Welcome name={name} onLogin={onLogin} />
      <Navbar name={name} onLogout={onLogout} />
      <Challenges key={key} shouldFocus={!!name} />
    </>
  )
}

function useLastNonEmpty (value: string) {
  const last = useRef(value)
  if (value) {
    last.current = value
  }
  return last.current
}
