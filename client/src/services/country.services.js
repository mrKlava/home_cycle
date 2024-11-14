import { makeRequest } from "../utils/axios"

const BASE_URL = '/countries'

/**
 * 
 */
const CountriesServices = {
  /**
   * Get list of all countries
   */
  async getCountries() {
    try {
      const resp = await makeRequest({ url: BASE_URL});

      return resp;
    } catch (err) {
      console.log(err)
      throw err;
    }
  },
  /**
   * Get list of all countries
   */
  async getCountryCities(countryID) {
    try {
      const resp = await makeRequest({ url: `${BASE_URL}/${countryID}/cities`});

      return resp;
    } catch (err) {
      console.log(err)
      throw err;
    }
  },
}

export default CountriesServices;