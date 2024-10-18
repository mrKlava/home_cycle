import { createContext, useEffect, useState } from "react"
import { httpRequest } from "../utils/axios"

// create context
export const AuthContext = createContext()

// create context provider
export const AuthContextProvider = ({ children }) => {
	// init current user state; if user is in local storage get user if not set to null
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user") || null)
	)

	/** Login 
		* check users credentials and loges in user if they are correct
		* if success updated states for current user and updated local storage
		*
		* @param {{str, str}} id user id, 
		* @param {{str, str}} pwd user password, 
		* @return {void}
	*/
	const login = async (cred) => {
		try {
			const resp = await httpRequest.post("/auth/login", cred, { withCredentials: true }) // make httpRequest 
			console.log(resp.data) 		// log res

			setCurrentUser(resp.data) 	// update state
		} catch (err) {
			console.log(err)			// log err
		}
	}


	/** Register 
		* create new user if success return true if failed return false
		*
		* @param {{str, str, str}} firstname user name, 
		* @param {{str, str, str}} lastname user surname, 
		* @param {{str, str, str}} pwd user password, 
		* @return {boolean}
	*/
	const register = async (cred) => {
		try {
			const resp = await httpRequest.post("/auth/register", cred)
			console.log(resp.data) 		// log resp

			return true
		} catch (err) {
			console.log(err)			// log err

			return false
		}
	}


	/** Logout 
		* logouts user from system, clears context and local storage
		*
		* @return {void}
	*/
	const logout = async () => {
		try {
			await httpRequest.post('/auth/logout')
			localStorage.setItem("user", null)

			setCurrentUser(null)
		} catch (err) {
			console.log(err)
		}
	}



	// update user data in local storage on change of state
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser))
	}, [currentUser])

	// return context
	return (
		<AuthContext.Provider value={
			{
				currentUser
				, login
				, logout
				, register
			}
		}>
			{children}
		</AuthContext.Provider>
	)
}