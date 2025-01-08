import express from "express";
import {
  getTimeSlots,
  getInterventions,
  getIntervention,
  getInterventionServices,
  getInterventionProducts,
  getInterventionComments,
} from "../controllers/interventions.js";


const router = express.Router();

router.get("/", getInterventions);
router.get("/services/:interventionID", getInterventionServices);
router.get("/products/:interventionID", getInterventionProducts);
router.get("/comments/:interventionID", getInterventionComments);
router.get("/slots/:technicianId", getTimeSlots);

/* CRUD by intervention id */
router.get("/:interventionID", getIntervention);


export default router;