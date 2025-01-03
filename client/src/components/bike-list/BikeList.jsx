import { useBikeContext } from "../../hooks";
import { BikeListItem } from "..";

import style from "./style.module.scss";

/**
 * ### User Bike List
 *  
 * Renders list of bikes if there is at least one bike, 
 * if no will render message saying that there is no bikes
 */
function BikeList() {
  const { bikes } = useBikeContext();

  return (
    <section>
      {
        bikes && bikes.length
          ? bikes.map((bike) => <BikeListItem key={bike.bikeId} bike={bike} />)
          : <h3>No bikes where found</h3>
      }
    </section>
  )
}

export default BikeList;