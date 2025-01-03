import { ServicesListItem } from "..";
import { useNewInterventionContext } from "../../hooks";

import style from "./style.module.scss";

/**
 * ### Service List
 *  
 * Renders list of Services if there is at least one service, 
 * if no will render message saying that there is no services
 */
function ServicesList({ services = [] }) {
  const { servicesAdded } = useNewInterventionContext();

  return (
    <section className={style.services}>
      {
        services && services.length
          ? services.map((service) => (
            <ServicesListItem
              className={style.servicesItem}
              key={service.serviceId}
              service={service}
              quantity={servicesAdded[service.serviceId] ? servicesAdded[service.serviceId].quantity : 0}
            />
          ))
          : <h3>No services where found</h3>
      }
    </section>
  )
}

export default ServicesList;