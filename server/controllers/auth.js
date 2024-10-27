import db from "../utils/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserQueries from "../queries/user.queries.js"


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
    const { email, password } = req.body

    // check if credentials are not empty
    if (!email || !password) return res.status(200).json({ error: 'Must provide email and password' })

    const user = await UserQueries.getUserByEmail(email)

    if (!user) return res.status(200).json({ error: 'Incorrect credentials' })

    // check password match
    const checkPassword = bcrypt.compareSync(password, user.hash) // index 0 - array of users should have only one item

    if (!checkPassword) return res.status(200).json({ error: 'Incorrect password' })

    const { hash, ...currentUser } = user // extract user object without hashed password
    const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY) // create token using user id 

    return res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).json({ data: currentUser })

  } catch (err) {
    return next(err)
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
export const register = (req, res) => {
  // create hashed password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.pwd, salt)

  // create new user
  const q = `
  INSERT INTO users (firstname, lastname, hash)
  VALUES (?);
`

  const params = [
    req.body.firstname,
    req.body.lastname,
    hash
  ]

  db.query(q, [params], (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json("User has been created")
  })
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
  }).status(200).json({message: "Successfully logged out"})
}