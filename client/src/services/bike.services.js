import { makeRequest } from "../utils/axios"

const BASE_URL = '/bikes/'

const BikeServices = {

  async getBikes() {
    try {
      const resp = await makeRequest({ url: BASE_URL })

      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  async getBikeById(id) {
    try {
      const resp = await makeRequest({ url: BASE_URL + id })

      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },
}

export default BikeServices;