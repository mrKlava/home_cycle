import { makeRequest } from "../utils/axios"

const BASE_URL = '/bikes/'

const BikeServices = {
  async getUserBikes() {
    try {
      const resp = await makeRequest({url: BASE_URL + 'user'})

      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  async getUserBikeByID(id) {
    try {
      const resp = await makeRequest({url: BASE_URL + 'user/' + id})

      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  }

}

export default BikeServices