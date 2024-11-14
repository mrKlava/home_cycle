import { makeRequest } from "../utils/axios"

const BASE_URL = '/interventions/'

const InterventionServices = {

  /**
   * Gets list of interventions
   */
  async getInterventions() {
    try {
      const resp = await makeRequest({ url: BASE_URL })

      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  /**
   * Gets list of intervention by it's id
   * @param {string} id intervention ID
   */
  async getInterventionById(id) {
    try {
      const resp = await makeRequest({ url: BASE_URL + id })

      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },
}

export default InterventionServices;