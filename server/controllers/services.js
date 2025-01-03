import { RequestTools, ResponseTools } from "../utils/index.js";
import { ServiceQueries } from "../queries/index.js";

import RESPONSES from "../constants/responses.js";

/* GET */

/**
 * ### Returns list of Services
 */
export const getServices = async (req, res, next) => {
  try {
    // get current user
    const currentUser = ResponseTools.getUserFromLocals(res);

    // response data
    let services;

    // select which query you need execute
    if (currentUser.role === 'client') {
      // get list of bike for current user
      services = await ServiceQueries.getServices(currentUser.id);
    } else {
      services = await ServiceQueries.getServices();
    }

    // check if there are bikes
    if (!services.length) return res.status(200).json({ data: services, message: RESPONSES.MESSAGES.NO_SERVICE });

    // return list of bikes
    return res.status(200).json({ data: services });
  } catch (err) {
    return next(err);
  }
}