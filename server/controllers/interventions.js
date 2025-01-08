import { RESPONSES } from "../constants/index.js";
import { InterventionQueries } from "../queries/index.js"
import { RequestTools, ResponseTools } from "../utils/index.js";

/* Get all interventions */

export const getInterventions = async (req, res, next) => {
  try {
    const currentUser = ResponseTools.getUserFromLocals(res);

    let interventions;

    // select which query you need execute
    if (currentUser.role === 'client') {
      interventions = await InterventionQueries.getInterventionsByUserId(currentUser.id);
    } else {
      interventions = await InterventionQueries.getInterventions();
    }

    // check if there are interventions
    if (!interventions.length) return res.status(200).json({ data: interventions, message: RESPONSES.MESSAGES.NO_INTERVENTION });

    return res.status(200).json({ data: interventions });
  } catch (err) {
    return next(err);
  }
}

export const getIntervention = async (req, res, next) => {
  try {
    const paramInterventionId = RequestTools.getStringParam(req, 'interventionID');
    if (!paramInterventionId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_PARAM });

    const currentUser = ResponseTools.getUserFromLocals(res);

    let intervention;

    if (currentUser.role === 'client') {
      intervention = await InterventionQueries.getInterventionByIdAndUserId(paramInterventionId, currentUser.id);
    } else {
      intervention = await InterventionQueries.getInterventionById(paramInterventionId);
    }

    if (!intervention) return res.status(200).json({ message: RESPONSES.MESSAGES.NO_INTERVENTION });

    return res.status(200).json({ data: intervention });
  } catch (err) {
    return next(err);
  }
}

export const getInterventionServices = async (req, res, next) => {
  try {
    const paramInterventionId = RequestTools.getStringParam(req, 'interventionID');
    if (!paramInterventionId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_PARAM });

    const currentUser = ResponseTools.getUserFromLocals(res);

    let services;

    if (currentUser.role === 'client') {
      services = await InterventionQueries.getInterventionServicesByIdAndUserId(paramInterventionId, currentUser.id);
    } else {
      services = await InterventionQueries.getInterventionById(paramInterventionId);
    }

    if (!services.length) return res.status(200).json({ message: RESPONSES.MESSAGES.NO_SERVICE});

    return res.status(200).json({ data: services });
  } catch (err) {
    return next(err);
  }
}

export const getInterventionProducts = async (req, res, next) => {
  try {
    const paramInterventionId = RequestTools.getStringParam(req, 'interventionID');
    if (!paramInterventionId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_PARAM });

    const currentUser = ResponseTools.getUserFromLocals(res);

    let products;

    if (currentUser.role === 'client') {
      products = await InterventionQueries.getInterventionProductsByIdAndUserId(paramInterventionId, currentUser.id);
    } else {
      products = await InterventionQueries.getInterventionById(paramInterventionId);
    }

    if (!products.length) return res.status(200).json({ message: RESPONSES.MESSAGES.NO_PRODUCT});

    return res.status(200).json({ data: products });
  } catch (err) {
    return next(err);
  }
}

export const getInterventionComments = async (req, res, next) => {
  try {
    const paramInterventionId = RequestTools.getStringParam(req, 'interventionID');
    if (!paramInterventionId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_PARAM });

    const currentUser = ResponseTools.getUserFromLocals(res);

    let comments;

    if (currentUser.role === 'client') {
      comments = await InterventionQueries.getInterventionCommentsByIdAndUserId(paramInterventionId, currentUser.id);
    } else {
      comments = await InterventionQueries.getInterventionById(paramInterventionId);
    }

    if (!comments.length) return res.status(200).json({ message: RESPONSES.MESSAGES.NO_COMMENT});

    return res.status(200).json({ data: comments });
  } catch (err) {
    return next(err);
  }
}

export const getTimeSlots = async (req, res, next) => {
  try {
    const paramTechnicianId = RequestTools.getStringParam(req, 'technicianId');
    if (!paramTechnicianId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_PARAM });

    let providedDate = RequestTools.getStringQuery(req, 'date');

    const [currentDate, currentTime] = new Date().toLocaleString('en-GB').split(', ');
    const [currentDay, currentMonth, currentYear] = currentDate.split('/');
    const [currentHour, currentMinutes] = currentTime.split(':');

    const closestAvailableHour = parseInt(currentHour) + (parseInt(currentMinutes) + 20 >= 60 ? 2 : 1);

    if (!providedDate) providedDate = currentDate;

    const currentUser = ResponseTools.getUserFromLocals(res);

    const takenSlots = await InterventionQueries.getTakenSlots(paramTechnicianId, providedDate);

    const availableSlots = [];

    return res.status(200).json({ data: availableSlots });
  } catch (err) {
    return next(err);
  }
}