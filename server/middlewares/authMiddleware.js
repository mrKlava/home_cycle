import jwt from "jsonwebtoken";

import { RESPONSES } from "../constants/index.js";

/**
 * Check if request has valid JWT and if has 
 */
const authMiddleware = async (req, res, next) => {
  try {
    // check if there is token

    const token = req.cookies.accessToken
    if (!token) return res.status(401).json({error: RESPONSES.ERRORS.NOT_AUTHENTICATED})
    
    jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
      if (err) return res.status(401).json({error: RESPONSES.ERRORS.FAILED_JWT})
      
      res.locals.user = user;

      return next();
    })
  } catch (err) {
    return next(err)
  }
}

export default authMiddleware;