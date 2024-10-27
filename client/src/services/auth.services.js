import { makeRequest } from "../utils/axios"

const BASE_URL = '/auth/'

/**
 * ### Auth Services
 * 
 * Used for authentication, creation new user
 */
const AuthServices = {
  /**
   * ### Login
   * 
   * Try to login user by provided credentials
   * 
   * @param {object} cred 
   * @param {string} cred.email
   * @param {string} cred.password 
   */
  async login(cred) {
    try {
      const resp = await makeRequest({
        url: BASE_URL + 'login',
        method: 'post',
        data: cred
      })
      
      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  /**
   * ### Logout
   * 
   * Removers current user session
   */
  async logout() {
    try {
      const resp = await makeRequest({
        url: BASE_URL + 'logout',
        method: 'post'
      })
      
      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },
}

export default AuthServices