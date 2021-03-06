import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { getChallenges } from '../domain/api'
import { useAsync } from './hooks'
import { Challenge } from './challenge/Challenge'
import { Loader } from './Loader'

export function Challenges () {
  const [challenges, error] = useAsync(getChallenges, [])
  const [selectedId, setSelectedId] = useState(localStorage.getItem('challengeId') || '')
  const selected = challenges && (challenges.find(({ id }) => id === selectedId) || challenges[0])

  useEffect(() => {
    localStorage.setItem('challengeId', selectedId)
  }, [selectedId])

  return (
    <Container>
      {!challenges && !error && <ChallengesLoader />}
      <List>
        {challenges && challenges.map(challenge => (
          <Item selected={challenge.id === (selected && selected.id)} key={challenge.id}>
            <Button onClick={() => setSelectedId(challenge.id)}>
              {challenge.title}
            </Button>
          </Item>
        ))}
      </List>
      {error && <div>Error fetching challenges</div>}
      {selected && (
        <Challenge
          key={selected.id}
          challenge={selected}
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

const ChallengesLoader = styled(Loader)`
  grid-column: span 2;
  & + ${List} {
    display: none;
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
