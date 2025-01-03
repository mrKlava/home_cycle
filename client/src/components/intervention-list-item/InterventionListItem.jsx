import { Link } from "react-router-dom";
import { useInterventionsContext } from "../../hooks";

import { Button } from "../../ui";

import style from "./style.module.scss";

import { LINKS } from "../../constants";

/**
 * Renders list element for component `BikeList.jsx`
 * 
 * @prop {object} bike bike to be rendered 
 */
function InterventionListItem({ intervention }) {

  /**
   * Delete btn click handler
   */
  const handleDelete = async () => await deleteBikeById(bike.bikeId);

  return (
    <article className={style.intervention}>
      <Link
        className={style.bikeLink}
        to={LINKS.BIKE.PATH + "/" + intervention.bikeId}
      >
        <h3>{intervention.nickname}</h3>
        <p>{new Date(intervention.created).toLocaleString('en-Gb')}</p>
      </Link>
      <Button onClick={handleDelete}>delete</Button>
    </article>
  )
}

export default InterventionListItem;