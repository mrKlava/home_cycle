import db from "../utils/db.js"

/**
 * Used to interact with Product data
 */
const ProductQueries = {
  /**
   * Gets all products
   * 
   * @returns {object[]} all products
   */
  async getProducts() {
    const q = `
    SELECT product_id AS productId
          ,company_id AS companyId
          ,name
          ,manufacturer
          ,model
          ,description
          ,current_price AS currentPrice 
    FROM products;`

    try {
      const [rows] = await db(q);

      return rows;
    } catch (err) {
      throw err;
    }
  },
}

Object.freeze(ProductQueries);

export default ProductQueries;