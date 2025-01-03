import { Link } from "react-router-dom";
import { useBikeContext } from "../../hooks";

import { Button } from "../../ui";

import style from "./style.module.scss";

import { LINKS } from "../../constants";

/**
 * Renders list element for component `BikeList.jsx`
 * 
 * @prop {object} bike bike to be rendered 
 */
function BikeListItem({ bike }) {
  const { deleteBikeById } = useBikeContext();

  /**
   * Delete btn click handler
   */
  const handleDelete = async () => await deleteBikeById(bike.bikeId);

  return (
    <article className={style.bike}>
      <Link
        className={style.bikeLink}
        to={LINKS.BIKE.PATH + "/" + bike.bikeId}
      >
        <h3>{bike.nickname}</h3>
        <p>{bike.manufacturer}</p>
        <p>{bike.model}</p>
        <p>{bike.typeName}</p>
        <p>{new Date(bike.created).toLocaleString('en-Gb')}</p>
      </Link>
      <Button onClick={handleDelete}>delete</Button>
    </article>
  )
}

export default BikeListItem;