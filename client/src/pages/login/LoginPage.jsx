import { useState } from "react"
import { Link } from "react-router-dom"

import { useAuthContext } from "../../hooks"

import { Button, InputText, Title } from "../../ui"

import { BUTTONS, INPUTS, LINKS, PAGES } from "../../constants"

/**
 * ### Login Page
 * #### path: /login
 */
function LoginPage() {
  // init state 
  const { login, authError, isAuthLoading } = useAuthContext()

  const [inputs, setInputs] = useState({ email: "", password: "" })

  // handle change of controlled inputs
  const handleChange = (e) => {
    const tg = e.target

    setInputs((prev) => ({ ...prev, [tg.name]: tg.value }))
  }

  // pass input data to login function in auth context
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const resp = await login(inputs)

      console.log(resp)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Title>{PAGES.LOGIN.TITLE}</Title>
      <InputText
        name="email"
        placeholder={INPUTS.EMAIL.PLACEHOLDER}
        type="email"
        onChange={handleChange}
        value={inputs.username}
      />
      <InputText
        name="password"
        placeholder={INPUTS.PASSWORD.PLACEHOLDER}
        type="password"
        onChange={handleChange}
        value={inputs.password}
      />
      {authError && <p>{authError}</p>}
      {isAuthLoading || <Button onClick={handleSubmit}>{BUTTONS.LOGIN}</Button>}

      <Link to={LINKS.REGISTER.PATH}>{LINKS.REGISTER.TEXT}</Link>
    </div>
  )
}

export default LoginPage