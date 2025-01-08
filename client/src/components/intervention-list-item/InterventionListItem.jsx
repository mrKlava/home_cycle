import { Link } from "react-router-dom";
import { useInterventionsContext } from "../../hooks";

import { Button } from "../../ui";

import { LINKS } from "../../constants";

import style from "./style.module.scss";

/**
 * Renders list element for component `BikeList.jsx`
 * 
 * @prop {object} bike bike to be rendered 
 */
function InterventionListItem({ intervention }) {


  return (
    <article className={style.intervention}>
      <Link
        className={style.interventionLink}
        to={LINKS.INTERVENTION.PATH + "/" + intervention.interventionId}
      >
        <h3>{intervention.bikeNickname}</h3>
        <p>{intervention.duration} min</p>
        <p>{new Date(intervention.date).toLocaleString('en-Gb')}</p>
        <p>{intervention.interventionStatus}</p>
      </Link>
    </article>
  )
}

export default InterventionListItem;