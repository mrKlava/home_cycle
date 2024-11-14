import { makeRequest } from "../utils/axios"

const BASE_URL = '/users/'

const UserServices = {
  /**
   * Get user data by user id
   * 
   * @param {number} userID - id of user
   */
  async getUserData(userID) {
    try {
      const resp = await makeRequest({ url: BASE_URL + userID });

      return resp;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}

export default UserServices;