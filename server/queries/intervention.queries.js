import db from "../utils/db.js"

/**
 * Used to interact with interventions
 */
const InterventionQueries = {
  /**
   * Gets all interventions
   * 
   * @returns {object[]} all interventions
   */
  async getInterventions() {
    const q = `SELECT * FROM interventions;`

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
   * @param {string} interventionId id of intervention
   * @returns {object[]} intervention
   */
  async getBikeById(interventionId) {
    const q = `
    SELECT * 
    FROM interventions
    WHERE intervention_id = ?;`

    try {
      const [rows] = await db(q, [interventionId])

      return rows[0]
    } catch (err) {
      throw err
    }
  },

  /**
   * Gets all interventions for user
   * 
   * @param {number} userId - id of user
   * @returns {object[]} all user interventions
   */
  async getInterventionsByUserId(userId) {
    const q = `
    SELECT * 
    FROM interventions
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
   * Gets all interventions for user
   * 
   * @param {number} userId - id of user
   * @param {number} interventionId - id of intervention
   * @returns {object[]} intervention 
   */
  async getBikeByIdAndUserId(interventionId, userId) {
    const q = `
    SELECT * 
    FROM interventions AS b
    WHERE b.bike_id = ?
      AND b.user_id = ?
    `

    try {
      const [rows] = await db(q, [interventionId, userId])

      return rows[0]
    } catch (err) {
      throw err
    }
  },
}

Object.freeze(InterventionQueries);

export default InterventionQueries;