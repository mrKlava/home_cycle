import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserQueries } from "../queries/index.js";
import { RESPONSES } from "../constants/index.js";


/**
 * ### Login
 * 
 * Handles authentication of user by provided credentials
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const login = async (req, res, next) => {
  try {
    // get credentials 
    const { email, password } = req.body;

    // check if credentials are not empty
    if (!email || !password) return res.status(200).json({ error: RESPONSES.ERRORS.PROVIDE_CREDENTIALS });

    const user = await UserQueries.getUserByEmail(email);

    if (!user) return res.status(200).json({ error: RESPONSES.ERRORS.INCORRECT_CREDENTIALS });

    // check password match
    const checkPassword = bcrypt.compareSync(password, user.hash); // index 0 - array of users should have only one item

    if (!checkPassword) return res.status(200).json({ error: RESPONSES.ERRORS.INCORRECT_PASSWORD });

    const { hash, ...currentUser } = user // extract user object without hashed password
    const token = jwt.sign({ id: user.user_id, role: 'client'}, process.env.SECRET_JWT, { expiresIn: '1day' }); // create token using user id 

    return res.cookie("accessToken", token, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      domain: "localhost",
      maxAge: 3600 * 1000 * 24,

    }).status(200).json({ data: currentUser, message: RESPONSES.MESSAGES.LOGIN_SUCCESS });

  } catch (err) {
    return next(err);
  }
}

/**
 * ### Register
 * 
 * Creates new user in the system
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const register = async (req, res, next) => {
  try {
    // get credentials 
    const {
      firstname
      , lastname
      , email
      , country
      , city
      , addressOne
      , addressTwo
      , zip
      , password
      , rePassword
    } = req.body;

    // check if credentials are not empty
    if (
      !firstname
      || !lastname
      || !email
      || !country
      || !city
      || !addressOne
      || !zip
      || !password
      || !rePassword
    ) return res.status(200).json({ error: RESPONSES.ERRORS.MISSING_PARAM });

    // check if user exists
    const user = await UserQueries.getUserByEmail(email);
    if (user) return res.status(200).json({ error: RESPONSES.ERRORS.USER_EXISTS });

    // create hashed password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // insert user to DB
    const newUser = await UserQueries.createUser(
      email
      , firstname
      , lastname
      , hash
      , city
      , zip
      , addressOne
      , addressTwo
    );
    
    console.log(newUser)

    return res.status(200).json({ data: newUser.insertId, message: RESPONSES.MESSAGES.USER_CREATED }) 
  } catch (err) {
    return next(err);
  }

}

/**
 * ### Logout
 * 
 * Removes current user from session
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const logout = (req, res) => {
  return res.clearCookie("accessToken", { //remove token
    secure: true,
    sameSite: "none" // to be able to use different ports
  }).status(200).json({ message: RESPONSES.MESSAGES.LOGOUT_SUCCESS })
}