import 'dotenv/config'
import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import jwt from "jsonwebtoken"

import { db } from './db.js'

import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"


/* Variables */

const PORT = process.env.PORT
const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT

const app = express()


/* Middleware */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

app.use(cors({ origin: ORIGIN_CLIENT }))

app.use(express.json())
app.use(cookieParser())


/* Routing */

app.use("/api/auth",      authRoutes)
app.use("/api/users",     usersRoutes)

/* Run server */

app.listen(PORT, () => {
  console.log(`Server turning on ${PORT}`)
})