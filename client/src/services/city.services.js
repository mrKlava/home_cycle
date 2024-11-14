import { makeRequest } from "../utils/axios"

const BASE_URL = '/cities'

/**
 * 
 */
const CityServices = {
  /**
   * Get list of all countries
   */
  async getCitiesByCountryId(countryID) {
    try {
      const resp = await makeRequest({ url: `${BASE_URL}/${countryID}`});

      return resp;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}

export default CityServices;