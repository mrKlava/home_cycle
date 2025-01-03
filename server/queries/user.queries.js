import db from "../utils/db.js"

/**
 * Used to interact with Users data
 */
const UserQueries = {
  /**
   * Gets all registered users
   * 
   * @returns {object[]} all users
   */
  async getUsers() {
    const q = `SELECT * FROM users;`

    try {
      const [rows] = await db(q)

      return rows
    } catch (err) {
      throw err
    }
  },

  /**
   * Finds user by provided id
   * @param {number} id 
   * @returns {object} returns user
   */
  async getUserById(id) {
    const q = `
    SELECT * 
    FROM users
    WHERE user_id = ?;`

    try {
      const [rows] = await db(q, id)

      return rows[0]
    } catch (err) {
      throw err
    }
  },
  /**
   * Finds user by provided id
   * @param {string} email 
   * @returns {object} returns user
   */
  async getUserByEmail(email) {
    const q = `
    SELECT * 
    FROM users
    WHERE email = ?;`

    try {
      const [rows] = await db(q, email)

      return rows[0]
    } catch (err) {
      throw err
    }
  },

  /**
   * Finds user by provided id
   * @param {number} id 
   * @returns {object} returns user
   */
  async getUserDataById(id) {
    const q = `
    SELECT * 
    FROM user_data
    WHERE userId = ?;`

    try {
      const [rows] = await db(q, id)

      return rows[0]
    } catch (err) {
      throw err
    }
  },
  /**
   * Finds user by provided id
   * @param {string} email 
   * @returns {object} returns user
   */
  async getUserByEmail(email) {
    const q = `
    SELECT * 
    FROM users
    WHERE email = ?;`

    try {
      const [rows] = await db(q, email)

      return rows[0]
    } catch (err) {
      throw err
    }
  },

  /**
   * Create new user
   * @param {string} email 
   * @returns {object} returns user
   */
  async createUser(
    email
    , firstname
    , lastname
    , hash
    , city
    , zip
    , addressOne
    , addressTwo
  ) {
    const q = `
    INSERT users 
    (email, name, surname, hash, city_id, zip_code, address_one, address_two)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?); `

    try {
      const [rows] = await db(q, [   
        email
        , firstname
        , lastname
        , hash
        , city
        , zip
        , addressOne
        , addressTwo=null
      ])

      return rows
    } catch (err) {
      throw err
    }
  },
}

Object.freeze(UserQueries);

export default UserQueries;