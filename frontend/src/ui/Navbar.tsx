import React from 'react'

export interface NavbarProps {
  name: string
  onLogout: () => void
}

export function Navbar ({ name, onLogout }: NavbarProps) {
  return (
    <div className="navbar">
      <div className="navbar-logo">JS Code Golf</div>
      <div className="navbar-name">{name}</div>
      <button className="navbar-logout" onClick={onLogout}>Logout</button>
    </div>
  )
}
