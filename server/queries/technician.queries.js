import db from "../utils/db.js"

/**
 * Used to interact with Technicians data
 */
const TechnicianQueries = {
  /**
   * Gets all technicians
   * 
   * @returns {object[]} all technicians
   */
  async getTechnicians() {
    const q = `
    SELECT technicien_id AS technicianId
          ,name
          ,surname
    FROM techniciens;`

    try {
      const [rows] = await db(q);

      return rows;
    } catch (err) {
      throw err;
    }
  },
}

Object.freeze(TechnicianQueries);

export default TechnicianQueries;