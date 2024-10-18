import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthContext } from "../../context/authContext"

function Register() {
  // init hooks
  const navigate = useNavigate()

  // init state
  const { register } = useContext(AuthContext)
  const [ inputs, setInputs ] = useState({firstname: "", lastname: "", pwd: ""})

  // handle change of controlled inputs
  const handleChange = (e) => {
    const tg = e.target

    setInputs((prev) => ({...prev, [tg.name] : tg.value}))
  }

  // pass input data to register function in auth context
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const resp = await register(inputs)

      if (resp) navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div>
      <Link to='/home'>home</Link>
      <h1>Register</h1>
      <form>
        <input 
          name="firstname" 
          type="text" 
          onChange={handleChange}
          value={inputs.userId} 
        />
        <input 
          name="lastname" 
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
      </form>
      <Link to='/login'>login</Link>
    </div>
  )
}

export default Register