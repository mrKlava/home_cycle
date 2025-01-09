import 'dotenv/config';

import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import router from './routes/router.js';

import { errorMiddleware, logRequestMiddleware } from './middlewares/index.js';


/* Variables */

const PORT = process.env.PORT;
const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT ? process.env.ORIGIN_CLIENT.split(',') : [];

/* App instance */

const app = express();

/* Middlewares */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors({ origin: ORIGIN_CLIENT }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logRequestMiddleware);

/* Routing */

app.use('/api', router);


app.use(errorMiddleware);

/* Run server */

app.listen(PORT, () => {
  console.log(`Server turning on ${PORT}`);
})