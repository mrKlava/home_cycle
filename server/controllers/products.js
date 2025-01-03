import { RequestTools, ResponseTools } from "../utils/index.js";
import { ProductQueries } from "../queries/index.js";

import RESPONSES from "../constants/responses.js";

/* GET */

/**
 * ### Returns list of products
 */
export const getProducts = async (req, res, next) => {
  try {
    // get current user
    const currentUser = ResponseTools.getUserFromLocals(res);

    // response data
    let products;

    // select which query you need execute
    if (currentUser.role === 'client') {
      // get list of bike for current user
      products = await ProductQueries.getProducts(currentUser.id);
    } else {
      products = await ProductQueries.getProducts();
    }

    // check if there are bikes
    if (!products.length) return res.status(200).json({ data: products, message: RESPONSES.MESSAGES.NO_PRODUCT});

    // return list of bikes
    return res.status(200).json({ data: products });
  } catch (err) {
    return next(err);
  }
}