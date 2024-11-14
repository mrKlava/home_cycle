import { RESPONSES } from "../constants/index.js";
import { InterventionQueries } from "../queries/index.js"
import { RequestTools, ResponseTools } from "../utils/index.js";

/* Get all users */

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

export const getInterventionById = async (req, res, next) => {
  try {
    // get bike and check if 
    const paramInterventionId = RequestTools.getStringParam(req, 'interventionID');
    if (!paramInterventionId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_PARAM });

    const currentUser = ResponseTools.getUserFromLocals(res);

    let intervention;

    if (currentUser.role === 'client') {
      intervention = await InterventionQueries.getBikeByIdAndUserId(paramInterventionId, currentUser.id);
    } else {
      intervention = await InterventionQueries.getInterventionById(paramInterventionId);
    }

    if (!intervention) return res.status(200).json({ message: RESPONSES.MESSAGES.NO_INTERVENTION });

    return res.status(200).json({ data: intervention });
  } catch (err) {
    return next(err);
  }
}