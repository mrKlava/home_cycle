import { useNewInterventionContext } from "../../hooks";

import { Button } from '../../ui';

import style from './style.module.scss';

function ServicesListItem({ service, quantity = 0 }) {
  const { addService, removeService } = useNewInterventionContext();

  /**
 * Handler for add button
 * 
 * @param {MouseEvent} e 
 */
  const handleAdd = (e) => {
    e.preventDefault();

    addService(service);
  }

  const handleRemove = (e) => {
    e.preventDefault();

    removeService(service);
  }

  return (
    <article className={style.service}>
      <div className={style.serviceImage}></div>
      <h3 className={style.serviceTitle}>{service.name}</h3>
      <p>{service.description}</p>
      <hr />
      <ul className={style.serviceInfo}>
        <li className={style.serviceInfoItem}>{service.duration} min</li>
        <li className={style.serviceInfoItem}>{service.currentPrice} EUR</li>
      </ul>
      <ul className={style.serviceActions}>
        <li className={style.serviceActionItem}>
          <Button onClick={handleAdd}>+</Button>
        </li>
        <li className={style.serviceActionItem}>
          {quantity}
        </li>
        <li className={style.serviceActionItem}>
          <Button onClick={handleRemove}>-</Button>
        </li>
      </ul>
    </article>
  )
}

export default ServicesListItem;