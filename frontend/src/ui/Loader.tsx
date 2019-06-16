import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const messages = [
  'Mowing grass',
  'Calculating shortest solution',
  'Verifying code correctness',
  'Generating random inputs',
  'Killing the vibe',
  'Running golf club elections',
  'Shouting at developers',
  'Initializing weapons',
  'Prosecuting cheaters',
  'Swiping right',
]

const randomMessage = () => messages[Math.floor(Math.random() * messages.length)]

export function Loader({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState(randomMessage)
  const [dots, setDots] = useState(1)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 500)
    const interval1 = setInterval(() => setMessage(randomMessage), 3000)
    const interval2 = setInterval(() => setDots(dots => (dots + 1) % 4), 500)
    return () => {
      clearTimeout(timeout)
      setInterval(interval1)
      setInterval(interval2)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <SpinnerWrapper className={className}>
      <Spinner />
      <span>{message}{'.'.repeat(dots)}</span>
    </SpinnerWrapper>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 20px 0;
`

const Spinner = styled.div`
  margin-bottom: 20px;
  width: 50px;
  height: 50px;
  border: 3px solid #ffd400;
  border-bottom: 3px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1.2s linear infinite;
`
