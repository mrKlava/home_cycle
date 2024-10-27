import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Title } from '../../ui'

import { LINKS, PAGES } from '../../constants'


function HomePage() {
  const navigate = useNavigate()

  const handleLogin = () => navigate(LINKS.LOGIN.PATH)
  const handleRegister = () => navigate(LINKS.REGISTER.PATH)
  return (
    <main>
      <Title>{PAGES.HOME.TITLE}</Title>

      <Button onClick={handleLogin}>{LINKS.LOGIN.TEXT}</Button>
      <Button onClick={handleRegister}>{LINKS.REGISTER.TEXT}</Button>
    </main>
  )
}

export default HomePage