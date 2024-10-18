import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/authContext"
import { Button } from "../../ui"

function Login() {
  // init state 
  const { login } = useContext(AuthContext)
  const [ inputs, setInputs ] = useState({userId: "", pwd: ""})

  // handle change of controlled inputs
  const handleChange = (e) => {
    const tg = e.target

    setInputs((prev) => ({...prev, [tg.name] : tg.value}))
  }

  // pass input data to login function in auth context
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const resp = await login(inputs)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Link to='/home'>home</Link>
      <h1>Login</h1>
      <form>
        <input 
          name="userId" 
          type="text" 
          onChange={handleChange}
          value={inputs.userId} 
        />
        <input 
          name="pwd" 
          type="password" 
          onChange={handleChange}
          value={inputs.pwd} 
        />

        <input type="submit" value="submit" onClick={handleSubmit}/>
        <Button onClick={handleSubmit}>Login</Button>
      </form>
      <Link to='/register'>register</Link>
    </div>
  )
}

export default Login