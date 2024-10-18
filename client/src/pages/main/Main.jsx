import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/authContext"
import { UsersContext } from "../../context/usersContext"


function Main() {
  // get states and functions from context
  const { currentUser, logout } = useContext(AuthContext)
  const { users, getUsers } = useContext(UsersContext)

  // fetch for users on mount
  useEffect(() => {
    getUsers()
  }, []) 

  return (
    <div className="main">
      {
        currentUser
          ? <button onClick={ () => logout() }>logout</button>
          : <Link to='/login'>login</Link>
      }
      <h1>Users</h1>
      <ul>
        <li><strong>ID - name</strong></li>
        {
          users.map((user) => <li key={user.user_id}>{user.user_id} - {user.firstname} {user.lastname}</li>)
        }
      </ul>
    </div>
  )
}

export default Main;
