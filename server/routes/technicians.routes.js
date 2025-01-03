import express from "express";

import {
  getTechnicians 
} from "../controllers/technicians.js";


const router = express.Router();

router.get("/", getTechnicians);

export default router;