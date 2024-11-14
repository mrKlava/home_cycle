import express from "express";
import {
  getCountries,
  getCountryById,
  getCountryCities
} from "../controllers/countries.js";


const router = express.Router();

router.get("/", getCountries);
router.get("/:countryID", getCountryById);
router.get("/:countryID/cities", getCountryCities);


export default router;