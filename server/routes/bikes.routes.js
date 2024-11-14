import express from "express";
import {
  getBikes,
  getBikeById
} from "../controllers/bikes.js";


const router = express.Router();

router.get("/", getBikes);
router.get("/:bikeID", getBikeById);


export default router;