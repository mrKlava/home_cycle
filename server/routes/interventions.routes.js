import express from "express";
import {
  getInterventions,
  getInterventionById
} from "../controllers/interventions.js";


const router = express.Router();

router.get("/", getInterventions);
router.get("/:interventionID", getInterventionById);


export default router;