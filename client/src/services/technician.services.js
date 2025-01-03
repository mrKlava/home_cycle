import { makeRequest } from "../utils/axios";

const BASE_URL = '/technicians';

/**
 * ### Technician Services
 * 
 * Used to interact with Technicians
 */
const TechnicianServices = {
  /**
   * Get user list of technicians
   * 
   */
  async getTechnicians() {
    try {
      const resp = await makeRequest({ url: BASE_URL });

      return resp;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}

export default TechnicianServices;