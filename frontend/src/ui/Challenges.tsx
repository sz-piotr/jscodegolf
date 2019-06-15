import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { getChallenges } from '../domain/api'
import { useAsync } from './hooks'
import { Challenge } from './Challenge'

export interface ChallengesProps {
  shouldFocus: boolean
}

export function Challenges ({ shouldFocus }: ChallengesProps) {
  const [challenges] = useAsync(getChallenges, [])
  const [selected, setSelected] = useState('introduction')
  const challenge = challenges && challenges.find(({ id }) => id === selected)

  return (
    <Container>
      <List>
        {challenges && challenges.map(challenge => (
          <Item selected={challenge.id === selected} key={challenge.id}>
            <Button onClick={() => setSelected(challenge.id)}>
              {challenge.title}
            </Button>
          </Item>
        ))}
      </List>
      {challenge && (
        <Challenge
          key={challenge.id}
          challenge={challenge}
          shouldFocus={shouldFocus}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 16px;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 200px 1fr;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 16px;
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;

  @media only screen and (max-width: 600px) {
    padding-bottom: 12px;
    border-bottom: 1px solid #ccc;
  }
`

const Item = styled.li<{ selected: boolean }>`
  margin-bottom: 0.1rem;
  padding: 4px 0;

  ${({ selected }) => selected && css`
    background-color: #ffd400;
  `}
`

const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;
`
