import React, { useState, FormEvent, useEffect } from 'react'
import styled, { css } from 'styled-components'

export interface WelcomeProps {
  name: string
  onLogin: (name: string) => void
}

export function Welcome(props: WelcomeProps) {
  const visible = !props.name
  const [name, setName] = useState(props.name)

  useEffect(() => {
    if (visible) {
      setName('')
    }
  }, [visible])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (name !== '') {
      props.onLogin(name)
    }
  }

  return (
    <Container hidden={!visible}>
      <Title>
        <span>Welcome to</span>
        <span>JS Code Golf</span>
      </Title>
      <Form onSubmit={onSubmit}>
        <Label htmlFor="name">Enter your name</Label>
        <Input
          name="name"
          value={name}
          disabled={!visible}
          onChange={e => setName(e.target.value)}
        />
        <Button disabled={!visible}>Enter</Button>
      </Form>
    </Container>
  )
}

const Container = styled.div<{ hidden: boolean }>`
  z-index: 1000;
  opacity: 1;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30vh;
  transition: opacity 1s ease-in-out;

  ${({ hidden }) => hidden && css`
    opacity: 0;
    pointer-events: none;
  `}
`

const Title = styled.h1`
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;

  & > *:nth-child(2) {
    font-size: 1.5em;
    background-color: #ffd400;
  }
`

const Form = styled.form`
  margin-top: 2rem;
  display: grid;
  grid-template-areas:
    "label label"
    "input button";
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;
`

const Label = styled.label`
  grid-area: label;
  text-align: center;
`

const Input = styled.input`
  grid-area: input;
  padding: 8px 16px;
  outline: none;
  background: none;
  border: 1px solid black;
  border-radius: 2px;
`

const Button = styled.button`
  grid-area: button;
  background: none;
  border: none;
  text-transform: uppercase;
  text-decoration: underline;
`
