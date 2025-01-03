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
    const q = `SELECT * FROM vw_bikes;`;

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
   * @param {number} bikeId id of the bike
   * @returns {object[]} all bikes
   */
  async getBikeById(bikeId) {
    const q = `
    SELECT * 
    FROM vw_bikes
    WHERE bikeId = ?;
    `;

    try {
      const [rows] = await db(q, [bikeId]);

      return rows[0];
    } catch (err) {
      throw err;
    }
  },

  /**
   * Gets all bikes for user
   * 
   * @param {number} userId id of user
   * @returns {object[]} all bikes
   */
  async getBikesByUserId(userId) {
    const q = `
    SELECT * 
    FROM vw_bikes
    WHERE userId = ?;
    `;

    try {
      const [rows] = await db(q, [userId]);

      return rows;
    } catch (err) {
      throw err;
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
    FROM vw_bikes
    WHERE bikeId = ?
      AND userId = ?
    `;

    try {
      const [rows] = await db(q, [bikeId, userId]);

      return rows[0];
    } catch (err) {
      throw err;
    }
  },


  /**
   * Gets all bike types
   * 
   * @param {number} userId - id of user
   * @param {number} bikeId - id of bike
   * @returns {object[]} all bikes
   */
  async getBikeTypes() {
    const q = `
    SELECT bt.type_id AS typeId
          ,bt.name
    FROM bike_types AS bt;
    `;

    try {
      const [rows] = await db(q);

      return rows;
    } catch (err) {
      throw err;
    }
  },


  /**
   * Create new Bike
   * 
   * @returns {number} all bikes
   */
  async createBike(userId, nickname, typeId = null, manufacturer = null, model = null, notes = null, isElectric = 0) {
    const q = `
    INSERT INTO bikes (user_id, nickname, type_id, manufacturer, model, notes, is_electric)
    VALUES(?, ?, ?, ?, ?, ?, ?);
    `;

    try {
      const resp = await db(q, [userId, nickname, typeId, manufacturer, model, notes, isElectric]);

      console.log(resp[0].insertId);

      return resp[0].insertId;

    } catch (err) {
      throw err;
    }
  },

  /**
     * Create new Bike
     * 
     * @returns {number} all bikes
     */
  async updateBike(userId, bikeId, nickname, typeId = null, manufacturer = null, model = null, notes = null, isElectric = 0) {
    const q = `
    UPDATE bikes
    SET nickname = ?, type_id = ?, manufacturer = ?, model = ?, notes = ?, is_electric =?
    WHERE user_id = ? AND bike_id = ?;
    `;

    try {
      const resp = await db(q, [nickname, typeId, manufacturer, model, notes, isElectric, userId, bikeId]);

      return resp[0].affectedRows;

    } catch (err) {
      throw err;
    }
  },


  /**
   * Delete bike by id of bike and user
   *
   * @param {number} bikeId 
   * @param {number} userId 
   * @returns {object[]} all bikes
   */
  async deleteBikeId(bikeId, userId) {
    const q = `
      DELETE FROM bikes
      WHERE bike_id=? AND user_id=?;
      `;

    try {
      const [rows] = await db(q, [bikeId, userId]);

      return rows;
    } catch (err) {
      throw err;
    }
  },
}

Object.freeze(BikeQueries);

export default BikeQueries;