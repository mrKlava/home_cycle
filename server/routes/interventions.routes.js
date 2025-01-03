import express from "express";
import {
  getInterventions,
  getIntervention
} from "../controllers/interventions.js";


const router = express.Router();

router.get("/", getInterventions);

/* CRUD by intervention id */
router.get("/:interventionID", getIntervention);


export default router;