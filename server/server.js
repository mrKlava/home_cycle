import 'dotenv/config'

import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import router from './routes/router.js'


/* Variables */

const PORT = process.env.PORT
const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT

/* App instance */

const app = express()

/* Middlewares */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

app.use(cors({ origin: ORIGIN_CLIENT }))

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// request log
app.use((req, res, next) => {
  const { method, url, params, body } = req
  const date = new Date().toLocaleDateString('en-GB')

  console.log(date, method, url, params, body)

  next()
})

/* Routing */

app.use('/api', router)

/* Run server */

app.listen(PORT, () => {
  console.log(`Server turning on ${PORT}`)
})