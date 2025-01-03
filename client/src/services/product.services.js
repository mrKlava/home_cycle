import { makeRequest } from "../utils/axios";

const BASE_URL = '/products/';

/**
 * ### Product Services
 * 
 * Used to interact with product
 */
const ProductServices = {
  /**
   * ### Get products data
   * 
   * Try to get list of products
   */
  async getProducts() {
    try {
      const resp = await makeRequest({ url: BASE_URL });

      return resp;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },
}

export default ProductServices;