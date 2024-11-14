import express from "express";
import {
  getCities,
  getCitiesByCountryId
} from "../controllers/cities.js";


const router = express.Router();

router.get("/", getCountries);
router.get("/:countryID", getCountryCities);


export default router;