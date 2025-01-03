import { RequestTools, ResponseTools } from "../utils/index.js";
import { TechnicianQueries } from "../queries/index.js";

import RESPONSES from "../constants/responses.js";

/* GET */

/**
 * ### Returns list of technicians
 */
export const getTechnicians = async (req, res, next) => {
  try {
    // get current user
    const currentUser = ResponseTools.getUserFromLocals(res);

    // response data
    let technicians;

    // select which query you need execute
    if (currentUser.role === 'client') {
      // get list of bike for current user
      technicians = await TechnicianQueries.getTechnicians(currentUser.id);
    } else {
      technicians = await TechnicianQueries.getTechnicians();
    }

    // check if there are bikes
    if (!technicians.length) return res.status(200).json({ data: technicians, message: RESPONSES.MESSAGES.NO_PRODUCT});

    // return list of bikes
    return res.status(200).json({ data: technicians });
  } catch (err) {
    return next(err);
  }
}