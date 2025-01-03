import RESPONSES from "../constants/responses.js";
import BikeQueries from "../queries/bike.queries.js";

import { RequestTools, ResponseTools } from "../utils/index.js";

/* Common routes */

/**
 * ### Returns list of bike types
 */
export const getBikeTypes = async (req, res, next) => {
  try {
    const bikeTypes = await BikeQueries.getBikeTypes();

    return res.status(200).json({ data: bikeTypes });
  } catch (err) {
    return next(err);
  }
}

/* GET */

/**
 * ### Returns list of bikes
 */
export const getBikes = async (req, res, next) => {
  try {
    // get current user
    const currentUser = ResponseTools.getUserFromLocals(res);

    // response data
    let bikes;

    // select which query you need execute
    if (currentUser.role === 'client') {
      // get list of bike for current user
      bikes = await BikeQueries.getBikesByUserId(currentUser.id);
    } else {
      bikes = await BikeQueries.getBikes();
    }

    // check if there are bikes
    if (!bikes.length) return res.status(200).json({ data: bikes, message: RESPONSES.MESSAGES.NO_BIKE });

    // return list of bikes
    return res.status(200).json({ data: bikes });
  } catch (err) {
    return next(err);
  }
}

/**
 * ### Returns details of bike
 */
export const getBike = async (req, res, next) => {
  try {
    // check if bike id was provided
    const paramBikeId = RequestTools.getIntParam(req, 'bikeID');
    if (!paramBikeId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_PARAM });

    // get current user from locals
    const currentUser = ResponseTools.getUserFromLocals(res);

    // resp data
    let bike;

    if (currentUser.role === 'client') {
      // fetch bike data for user
      bike = await BikeQueries.getBikeByIdAndUserId(paramBikeId, currentUser.id);
    } else {
      bike = await BikeQueries.getBikeById(paramBikeId);
    }

    // if bike was not found
    if (!bike) return res.status(200).json({ error: RESPONSES.MESSAGES.NO_BIKE });

    // return bike data
    return res.status(200).json({ data: bike });
  } catch (err) {
    return next(err);
  }
}

/* POST */

/**
 * ### Create new bike for user
 */
export const createBike = async (req, res, next) => {
  try {
    // get payload    
    const nickname = RequestTools.getStringBody(req, "nickname");
    const typeId = RequestTools.getIntBody(req, "typeId");
    const manufacturer = RequestTools.getStringBody(req, "manufacturer");
    const model = RequestTools.getStringBody(req, "model");
    const notes = RequestTools.getStringBody(req, "notes");
    const isElectric = RequestTools.getBooleanBody(req, "isElectric");

    // get current user
    const currentUser = ResponseTools.getUserFromLocals(res);
    // used for admin
    const userId = RequestTools.getIntBody(req, "userId");

    // resp data
    let bikeId = null;

    // select which query you need execute
    if (currentUser.role === 'client') {

      bikeId = await BikeQueries.createBike(
        currentUser.id,
        nickname && nickname.slice(0, 64),
        typeId > 6 ? null : typeId,
        manufacturer && manufacturer.slice(0, 128),
        model && model.slice(0, 128),
        notes && notes.slice(0, 2028),
        isElectric ? 1 : 0
      );
    } else {
      // TO DO: implement logic for other roles
    }

    // if failed to create bike
    if (!bikeId) return res.status(200).json({ error: RESPONSES.ERRORS.BIKE_CREATE_FAIL });

    // return success
    return res.status(200).json({ data: bikeId, message: RESPONSES.MESSAGES.BIKE_CREATED });
  } catch (err) {
    return next(err);
  }
}

/* PUT */

/**
 * ### Update user data
 */
export const updateBike = async (req, res, next) => {
  try {
    // get payload
    const bikeId = RequestTools.getIntParam(req, "bikeID");
    const nickname = RequestTools.getStringBody(req, "nickname");
    const typeId = RequestTools.getIntBody(req, "typeId");
    const manufacturer = RequestTools.getStringBody(req, "manufacturer");
    const model = RequestTools.getStringBody(req, "model");
    const notes = RequestTools.getStringBody(req, "notes");
    const isElectric = RequestTools.getBooleanBody(req, "isElectric");

    if (!bikeId) return res.status(200).json({ error: RESPONSES.MESSAGES.NO_BIKE });

    // get current user
    const currentUser = ResponseTools.getUserFromLocals(res);
    // user data
    const userId = RequestTools.getIntBody(req, "userId");

    // resp data
    let resp = null;

    // select which query you need execute
    if (currentUser.role === 'client') {
      // try to update bike
      resp = await BikeQueries.updateBike(
        currentUser.id,
        bikeId,
        nickname && nickname.slice(0, 64),
        typeId > 6 ? null : typeId,
        manufacturer && manufacturer.slice(0, 128),
        model && model.slice(0, 128),
        notes && notes.slice(0, 2028),
        isElectric ? 1 : 0
      );
    } else {
      // TO DO: implement logic for other roles
    }

    // if failed to update
    if (!resp) return res.status(200).json({ error: RESPONSES.ERRORS.BIKE_UPDATE_FAIL });

    // return success
    return res.status(200).json({ data: bikeId, message: RESPONSES.MESSAGES.BIKE_UPDATED });
  } catch (err) {
    return next(err);
  }
}

/* DELETE */

/**
 * ### Delete bike
 */
export const deleteBike = async (req, res, next) => {
  try {
    // get bike id 
    const bikeId = RequestTools.getIntParam(req, 'bikeID');
    if (!bikeId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_BIKE });

    // get current user
    const currentUser = ResponseTools.getUserFromLocals(res);

    // select which query you need execute
    if (currentUser.role === 'client') {
      await BikeQueries.deleteBikeId(bikeId, currentUser.id);
    } else {
      // TO DO: implement logic for other roles
    }

    // return success
    return res.status(200).json({ data: bikeId, message: RESPONSES.MESSAGES.BIKE_DELETED });
  } catch (err) {
    return next(err);
  }
}
