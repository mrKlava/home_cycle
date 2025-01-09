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
      const [rows] = await db(q);

      return rows;
    } catch (err) {
      throw err;
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
      const [rows] = await db(q, [interventionId]);

      return rows[0];
    } catch (err) {
      throw err;
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
    SELECT i.intervention_id AS interventionId
          , b.nickname AS bikeNickname
          , i.planned_date AS date
          , i.planned_duration AS duration
          , s.name AS interventionStatus
    FROM interventions AS i
    LEFT JOIN intervention_statuses AS s
      ON i.status_id = s.status_id
    LEFT JOIN bikes AS b
      ON i.bike_id = b.bike_id
    WHERE i.user_id = ?;
    `

    try {
      const [rows] = await db(q, [userId]);

      return rows;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Gets all interventions for user
   * 
   * @param {number} userId - id of user
   * @param {number} interventionId - id of intervention
   * @returns {object[]} intervention 
   */
  async getInterventionByIdAndUserId(interventionId, userId) {
    const q = `
    SELECT i.intervention_id AS interventionId
          , i.planned_date AS date
          , i.planned_duration AS duration
          , i.started_date AS startDate
          , i.ended_date AS endDate
          , s.name AS interventionStatus
          , t.technicien_id AS technicienId
          , CONCAT(t.name, ' ', t.surname) AS technicienName
          , b.nickname AS bikeNickname
          , b.bike_id AS bikeId
          , CONCAT(i.address_one, ', ', i.address_two, ', ', ct.name, ', ', i.zip_code,', ', cn.name) AS address
          , s.name AS status
    FROM interventions AS i
    LEFT JOIN intervention_statuses AS s
      	ON i.status_id = s.status_id
    LEFT JOIN bikes AS b
      	ON i.bike_id = b.bike_id
    LEFT JOIN techniciens AS t
    	ON i.technicien_id = t.technicien_id
    LEFT JOIN cities AS ct
    	ON i.city_id = ct.city_id
    LEFT JOIN countries AS cn
    	ON ct.country_id = cn.country_id
    WHERE i.intervention_id = ?
    	AND i.user_id = ?;
    `

    try {
      const [rows] = await db(q, [interventionId, userId]);

      return rows[0];
    } catch (err) {
      throw err;
    }
  },

  /**
   * Gets all intervention services for user
   * 
   * @param {number} userId - id of user
   * @param {number} interventionId - id of intervention
   * @returns {object[]} intervention 
   */
  async getInterventionServicesByIdAndUserId(interventionId, userId) {
    const q = `
    SELECT s.service_id AS serviceId
          ,s.name
          ,s.duration
          ,s.description
          ,si.quantity
          ,si.price
    FROM intervention_services AS si
    LEFT JOIN services AS s
      ON s.service_id = si.serivice_id
    LEFT JOIN interventions AS i
      ON si.intervention_id = i.intervention_id
    WHERE si.intervention_id = ?
      AND i.user_id = ?;
    `

    try {
      const [rows] = await db(q, [interventionId, userId]);

      return rows;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Gets all intervention products for user
   * 
   * @param {number} userId - id of user
   * @param {number} interventionId - id of intervention
   * @returns {object[]} intervention 
   */
  async getInterventionProductsByIdAndUserId(interventionId, userId) {
    const q = `
    SELECT p.product_id AS productId
          ,p.name
          ,p.description
          ,pi.quantity
          ,pi.price
    FROM intervention_products AS pi
    LEFT JOIN products AS p
      ON p.product_id = pi.product_id
    LEFT JOIN interventions AS i
      ON pi.intervention_id = i.intervention_id
    WHERE pi.intervention_id = ?
      AND i.user_id = ?;
    `

    try {
      const [rows] = await db(q, [interventionId, userId]);

      return rows;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Gets all interventions for user
   * 
   * @param {number} userId - id of user
   * @param {number} interventionId - id of intervention
   * @returns {object[]} intervention 
   */
  async getInterventionCommentsByIdAndUserId(interventionId, userId) {
    const q = `
    SELECT c.comment_id AS commentId
          ,c.text
          ,c.created AS date
    FROM comments AS c
    LEFT JOIN comment_images AS ci
      ON c.intervention_id = c.intervention_id
    LEFT JOIN interventions AS i
      ON c.intervention_id = i.intervention_id
    WHERE c.intervention_id = ?
      AND i.user_id = ?;
    `

    try {
      const [rows] = await db(q, [interventionId, userId]);

      return rows;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Gets time slots for technician
   * 
   * @param {number} technicianId - technician id
   * @param {string} date - date to start
   * @returns {object[]} all user interventions
   */
  async getTakenSlots(technicianId, date) {
    const q = `
    SELECT * 
    FROM vw_time_slots
    WHERE technicienId = ?
      AND DATE(plannedStart) = ?;
    `

    console.log('date in query: ', date)

    try {
      const [rows] = await db(q, [technicianId, date]);

      return rows;
    } catch (err) {
      throw err;
    }
  },
}

Object.freeze(InterventionQueries);

export default InterventionQueries;