import express from "express"
import {
  getUserBikes,
  getUserBikeById
} from "../controllers/bikes.js"


const router = express.Router()

router.get("/user", getUserBikes)
router.get("/user/:id", getUserBikeById)


export default router