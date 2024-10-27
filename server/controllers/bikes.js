import db from "../utils/db.js"

/* Get all users */

export const getUserBikes = async (req, res) => {
  try {
    const resp = await db('SELECT * FROM test')

    return res.status(200).json({data: resp[0]})
  } catch (error) {
    return next(err)
  }
}
export const getUserBikeById = async (req, res, next) => {
  try {
    const [bike] = await db('SELECT * FROM test WHERE id = ?', [1])

    if (!bike) return res.status(200).json({error: 'Bike not found'}) 

    return res.status(200).json({data: bike[0]})
  } catch (error) {
    return next(err)
  }
}