import { createContext, useState } from "react";
import { httpRequest } from "../utils/axios";

export const UsersContext = createContext()

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([])

  /** Get all users
    * fetch for all registered users
    * 
    * @return {void}
  */
  const getUsers = async () => {
    try {
      const resp = await httpRequest.get('/users')
      setUsers(resp.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <UsersContext.Provider value={
      {
        users
        , getUsers
      }
    }>
      {children}
    </UsersContext.Provider>
  )
}