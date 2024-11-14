import { createContext, useEffect, useState } from "react";
import { AuthServices } from "../services";

// create context
export const AuthContext = createContext();

/**
 * ### Auth Context Provider
 * 
 * Is used to manage currently connected user
 */
const AuthContextProvider = ({ children }) => {
	// init current user state; if user is in local storage get user if not set to null
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user") || null)
	);
	const [authError, setAuthError] = useState('');
	const [authMessage, setAuthMessage] = useState('');
	const [isAuthLoading, setIsAuthLoading] = useState(false);

	/** Login 
		* check users credentials and loges in user if they are correct
		* if success updated states for current user and updated local storage
		*	
		* @param {object} cred user credentials, 
		* @param {string} cred.email user email, 
		* @param {string} cred.pwd user password, 
		* @return {void}
	*/
	const login = async (cred) => {
		try {
			// const resp = await httpRequest.post("/auth/login", cred, { withCredentials: true }) // make httpRequest 

			setIsAuthLoading(true);
			setAuthError('');
			setAuthMessage('');

			const { data: user, error, message } = await AuthServices.login(cred);

			if (user) setCurrentUser(user);

			if (error) setAuthError(error);
			if (message) setAuthMessage(message);

			setIsAuthLoading(false);

			// we can return error or message instead of using context

		} catch (err) {
			setCurrentUser(null);
			setAuthError('');
			setAuthMessage('');

			setIsAuthLoading(false);

			throw err;
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
			setIsAuthLoading(true);
			setAuthError('');

			const { error } = await AuthServices.register(cred);

			setIsAuthLoading(false);

			// if we failed to created user
			if (error) {
				setAuthError(error);
				
				return false
			}
			
			// if we successfully created user
			return true;

		} catch (err) {
			setCurrentUser(null);
			setAuthError('');

			setIsAuthLoading(false);

			throw err;
		}
	}


	/** Logout 
		* logouts user from system, clears context and local storage
		*
		* @return {void}
	*/
	const logout = async () => {
		try {
			await AuthServices.logout();

			localStorage.setItem("user", null);

			setCurrentUser(null);
		} catch (err) {
			console.log(err);
		}
	}



	// update user data in local storage on change of state
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	// return context
	return (
		<AuthContext.Provider value={
			{
				currentUser
				, authError
				, authMessage
				, isAuthLoading
				, login
				, logout
				, register
			}
		}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;