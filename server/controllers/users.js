import { db } from "../db.js"

/* Get all users */

export const getUsers = (req, res) => {
  const q = `
  SELECT * 
  FROM users
  `

  return res.status(200).json('test')


  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json(data)
  })
}