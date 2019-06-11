import React from 'react'
import styled from 'styled-components'

export interface NavbarProps {
  name: string
  onLogout: () => void
}

export function Navbar ({ name, onLogout }: NavbarProps) {
  return (
    <Container>
      <Logo>JS Code Golf</Logo>
      <Name>{name}</Name>
      <Logout onClick={onLogout}>Logout</Logout>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 16px 0;
  align-items: baseline;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;

  @media only screen and (max-width: 1200px) {
    margin: 0 16px 1rem 16px;
  }
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  flex: 1;
  white-space: nowrap;
`

const Name = styled.div`
  font-weight: bold;
  margin: 0 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Logout = styled.button`
  text-transform: uppercase;
  background: none;
  border: none;
  font-size: 0.9em;
  text-decoration: underline;
  padding: 0;
`
