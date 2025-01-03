import db from "../utils/db.js"

/**
 * Used to interact with Services data
 */
const ServiceQueries = {
  /**
   * Gets all services
   * 
   * @returns {object[]} all services
   */
  async getServices() {
    const q = `
    SELECT service_id AS serviceId
          ,company_id AS companyId
          ,name
          ,description
          ,duration
          ,current_price AS currentPrice 
    FROM services;`

    try {
      const [rows] = await db(q);

      return rows;
    } catch (err) {
      throw err;
    }
  },
}

Object.freeze(ServiceQueries);

export default ServiceQueries;