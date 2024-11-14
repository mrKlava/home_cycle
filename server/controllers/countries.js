import { CountryQueries } from "../queries/index.js";

import { RequestTools } from "../utils/index.js";

import RESPONSES from "../constants/responses.js";

/* Get all users */

export const getCountries = async (req, res, next) => {
  try {
    const countries = await CountryQueries.getCountries();

    // check if there are bikes
    if (!countries.length) return res.status(200).json({ data: countries, message: RESPONSES.MESSAGES.NO_COUNTRY });

    return res.status(200).json({ data: countries });
  } catch (err) {
    return next(err);
  }
}

export const getCountryById = async (req, res, next) => {
  try {
    const paramCountryId = RequestTools.getIntParam(req, 'countryID');
    if (!paramCountryId) return res.status(200).json({error: RESPONSES.ERRORS.NO_PARAM});

    const country = await CountryQueries.getCountryById(paramCountryId);

    // check if there are bikes
    if (!country.length) return res.status(200).json({ data: country, message: RESPONSES.MESSAGES.NO_COUNTRY });

    return res.status(200).json({ data: country });
  } catch (err) {
    return next(err);
  }
}

export const getCountryCities = async (req, res, next) => {
  try {
    const paramCountryId = RequestTools.getIntParam(req, 'countryID');
    if (!paramCountryId) return res.status(200).json({error: RESPONSES.ERRORS.NO_PARAM});

    const country = await CountryQueries.getCountryCities(paramCountryId);

    // check if there are bikes
    if (!country.length) return res.status(200).json({ data: country, message: RESPONSES.MESSAGES.NO_CITY });

    return res.status(200).json({ data: country });
  } catch (err) {
    return next(err);
  }
}