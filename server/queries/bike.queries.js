import db from "../utils/db.js"

/**
 * Used to interact with bikes
 */
const BikeQueries = {
  /**
   * Gets all bikes
   * 
   * @returns {object[]} all bikes
   */
  async getBikes() {
    const q = `SELECT * FROM bikes;`
    
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
   * @param {number} bikeId
   * @returns {object[]} all bikes
   */
  async getBikeById(bikeId) {
    const q = `
    SELECT * 
    FROM bikes
    WHERE bike_id = ?;`
    
    try {
      const [rows] = await db(q, [bikeId])

      return rows[0]
    } catch (err) {
      throw err
    }
  },

  /**
   * Gets all bikes for user
   * 
   * @param {number} userId - id of user
   * @returns {object[]} all bikes
   */
  async getBikesByUserId(userId) {
    const q = `
    SELECT * 
    FROM bikes
    WHERE user_id = ?;
    `
    
    try {
      const [rows] = await db(q, [userId])

      return rows
    } catch (err) {
      throw err
    }
  },

  /**
   * Gets all bikes for user
   * 
   * @param {number} userId - id of user
   * @param {number} bikeId - id of bike
   * @returns {object[]} all bikes
   */
  async getBikeByIdAndUserId(bikeId, userId) {
    const q = `
    SELECT * 
    FROM bikes AS b
    WHERE b.bike_id = ?
      AND b.user_id = ?
    `
    
    try {
      const [rows] = await db(q, [bikeId, userId])

      return rows[0]
    } catch (err) {
      throw err
    }
  },
}

Object.freeze(BikeQueries);

export default BikeQueries;