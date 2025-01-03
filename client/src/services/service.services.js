import { makeRequest } from "../utils/axios";

const BASE_URL = '/services/';

/**
 * ### Service Services
 * 
 * Used to interact with services
 */
const ServiceServices = {
  /**
   * ### Get bikes data
   * 
   * Try to get list
   */
  async getServices() {
    try {
      const resp = await makeRequest({ url: BASE_URL });

      return resp;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },
}

export default ServiceServices;