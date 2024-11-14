import db from "../utils/db.js"

/**
 * Used to interact with bikes
 */
const CountryQueries = {
  /**
   * Gets all bikes
   * 
   * @returns {object[]} all bikes
   */
  async getCountries() {
    const q = `SELECT * FROM countries;`
    
    try {
      const [rows] = await db(q)

      return rows
    } catch (err) {
      throw err
    }
  },

  /**
   * Gets bike by bike ID
   * 
   * @param {number} countryID
   * @returns {object[]} all bikes
   */
  async getCountryById(countryID) {
    const q = `
    SELECT * 
    FROM countries
    WHERE country_id = ?;`
    
    try {
      const [rows] = await db(q, [countryID])

      return rows[0]
    } catch (err) {
      throw err
    }
  },

  /**
   * Gets bike by bike ID
   * 
   * @param {number} countryID
   * @returns {object[]} all bikes
   */
  async getCountryCities(countryID) {
    const q = `
    SELECT * 
    FROM cities
    WHERE country_id = ?;`;
    
    try {
      const [rows] = await db(q, [countryID]);

      return rows;
    } catch (err) {
      throw err
    }
  },
}

Object.freeze(CountryQueries);

export default CountryQueries;