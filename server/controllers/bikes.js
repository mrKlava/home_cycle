import RESPONSES from "../constants/responses.js";
import BikeQueries from "../queries/bike.queries.js"

import { RequestTools, ResponseTools } from "../utils/index.js";

/* Get all users */

export const getBikes = async (req, res, next) => {
  try {
    const currentUser = ResponseTools.getUserFromLocals(res);

    let bikes;

    // select which query you need execute
    if (currentUser.role === 'client') {
      bikes = await BikeQueries.getBikesByUserId(currentUser.id);
    } else {
      bikes = await BikeQueries.getBikes();
    }
    
    // check if there are bikes
    if (!bikes.length) return res.status(200).json({ data: bikes, message: RESPONSES.MESSAGES.NO_BIKE });

    return res.status(200).json({ data: bikes });
  } catch (err) {
    return next(err);
  }
}

export const getBikeById = async (req, res, next) => {
  try {
    // get bike and check if 
    const paramBikeId = RequestTools.getIntParam(req, 'bikeID')
    if (!paramBikeId) return res.status(200).json({error: RESPONSES.ERRORS.NO_PARAM})

    
    const currentUser = ResponseTools.getUserFromLocals(res);

    let bike;

    if (currentUser.role === 'client') {
      bike = await BikeQueries.getBikeByIdAndUserId(paramBikeId, currentUser.id);
    } else {
      bike = await BikeQueries.getBikeById(paramBikeId);
    }

    if (!bike) return res.status(200).json({ error: RESPONSES.MESSAGES.NO_BIKE});

    return res.status(200).json({ data: bike });
  } catch (err) {
    return next(err);
  }
}