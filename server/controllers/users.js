import UserQueries from "../queries/user.queries.js";
import { RequestTools, ResponseTools } from "../utils/index.js";

import RESPONSES from "../constants/responses.js";

/**
 * Gets list of all users
 */
export const getUsers = async (req, res, next) => {
  try {
    
  } catch (err) {
    return next(err)
  }
};

/**
 * Get user by userID
 * 
 * If request is sent by admin will use req.params.userID
 * If request is sent by user will use user id from token
 */
export const getUserByID = async (req, res, next) => {
  try {
    const currentUser = ResponseTools.getUserFromLocals(res);
    const paramUserId = RequestTools.getIntParam(req, 'userID');

    // if request is coming from admin use params if user use user ID from token
    const id = currentUser.role !== 'admin' ? currentUser.id : paramUserId; 

    if (!id) return res.status(200).json({error: RESPONSES.ERRORS.NO_PARAM});

    const user = await UserQueries.getUserDataById(id);

    console.log(user)

    if (!user) res.status(200).json({message: RESPONSES.MESSAGES.NO_USER});

    return res.status(200).json({data: user});
  } catch (err) {
    return next(err);
  }
};
