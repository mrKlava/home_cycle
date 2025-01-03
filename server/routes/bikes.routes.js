import express from "express";
import {
  getBikes,
  getBike,
  getBikeTypes,
  createBike,
  updateBike,
  deleteBike,
} from "../controllers/bikes.js";


const router = express.Router();

router.get("/", getBikes);
router.post("/", createBike);

/* Common */
router.get("/types", getBikeTypes);

/* CRUD bu bike id*/
router.get("/:bikeID", getBike);
router.put("/:bikeID", updateBike);
router.delete("/:bikeID", deleteBike);

export default router;