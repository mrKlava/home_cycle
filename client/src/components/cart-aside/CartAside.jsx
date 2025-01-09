import { useNewInterventionContext } from '../../hooks';

import style from './style.module.scss';

function CartAside() {
  const { servicesAdded, productsAdded, totalServicePrice, totalProductPrice, totalTime } = useNewInterventionContext();

  return (
    <aside className={style.summary}>
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price EUR</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(servicesAdded).map(([id, service]) => {
              return (
                <tr key={id}>
                  <td>{service.name}</td>
                  <td>{service.quantity}</td>
                  <td>{service.price}</td>
                </tr>

              )
            })
          }
          {
            Boolean(totalServicePrice) && (
              <tr>
                <th>Total</th>
                <td></td>
                <td>{totalServicePrice.toFixed(2)}</td>
              </tr>
            )
          }
          {
            Object.entries(productsAdded).map(([id, product]) => {
              return (
                <tr key={id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                </tr>

              )
            })
          }
          {
            Boolean(totalProductPrice) && (
              <tr>
                <th>Total</th>
                <td></td>
                <td>{totalProductPrice.toFixed(2)}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <h3>Total Price: <span>{(totalServicePrice + totalProductPrice).toFixed(2)}</span> EUR</h3>
      <h3>Total Duration: <span>{totalTime}</span> min</h3>
    </aside>
  )
}

export default CartAside;