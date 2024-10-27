import mysql from 'mysql2/promise';

import { POOL_CONFIG } from '../config/db.config.js';

// Holds current pool connection
let pool = null;

const createConnection = () => {
  // MySQL connection pool settings
  pool = createPool();

  // return created pool
  return pool;
}

/**
 * Creates a MySQL connection pool using the SSH stream.
 *
 * @returns {mysql.Pool} MySQL connection pool
 */
const createPool = () => {
  // check if we have already the pool if not create pool
  pool || (pool = mysql.createPool(POOL_CONFIG));

  console.log('DB Pool created');

  // return existing or on new pool
  return pool;
};

/**
 * Gets the MySQL connection pool via SSH, or creates it if it doesn't exist.
 * 
 * @returns {Promise<mysql.Pool>} - MySQL connection pool
 */
const getCurrentPool = async () => {
  // if pool exists use current pool
  if (pool) return pool;

  // create new connection with pool ??? or we need to create just pool ???
  return await createConnection();
};

/**
 * Executes a MySQL query using the connection pool.
 *
 * @param {string} query - SQL query string
 * @param {any[]} params - Query parameters
 * @returns {Promise<[mysql.QueryResult, mysql.FieldPacket[]]>} - Query result and field packet array - [rows, fields]
 *
 * @example const [rows, fields] = await db('SELECT * FROM users WHERE id = ?', [1]);
 */
const db = async (query, params = []) => {
  try {
    // get current pool connection or create new
    const pool = await getCurrentPool();

    // execute query 
    const data = await pool.query(query, params);
    // return [rows, fields]
    return data;
  } catch (err) {
    console.error('\nSQL Error:\n', err);

    throw err;
  }
};

// Create Pool connection
createConnection();

export default db