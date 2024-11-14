import db from "../utils/db.js"

/**
 * Used to interact with Users data
 */
const InvoiceQueries = {
  /**
   * Gets all registered users
   * 
   * @returns {object[]} all users
   */
  async getInvoices() {
    const q = `SELECT * FROM interventions;`

    try {
      const [rows] = await db(q)

      return rows
    } catch (err) {
      throw err
    }
  },
  async getInvoicesByUserId(userId) {
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
  async getInvoiceByIdAndUserId(invoiceId, userId) {
    const q = `
    SELECT * 
    FROM interventions
    WHERE intervention_id = ?
      AND user_id = ?;
    `

    try {
      const [rows] = await db(q, [invoiceId, userId])

      return rows[0]
    } catch (err) {
      throw err
    }
  },
}

Object.freeze(InvoiceQueries);

export default InvoiceQueries;