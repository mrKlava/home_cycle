import { useNewInterventionContext } from "../../hooks";

import { Button } from '../../ui';

import style from './style.module.scss';

/**
 * ### Product List Item
 * 
 * Used to render details of product
 */
function ProductsListItem({ product, quantity = 0 }) {
  const { addProduct, removeProduct } = useNewInterventionContext();

  /**
 * Handler for add button
 * 
 * @param {MouseEvent} e 
 */
  const handleAdd = (e) => {
    e.preventDefault();

    addProduct(product);
  }

  const handleRemove = (e) => {
    e.preventDefault();

    removeProduct(product);
  }

  return (
    <article className={style.product}>
      <div className={style.productImage}></div>
      <h3 className={style.productTitle}>{product.name}</h3>
      <p>{product.description}</p>
      <hr />
      <ul className={style.productInfo}>
        <li className={style.productInfoItem}>{product.currentPrice} EUR</li>
      </ul>
      <ul className={style.productActions}>
        <li className={style.productActionItem}>
          <Button onClick={handleAdd}>+</Button>
        </li>
        <li className={style.productActionItem}>
          {quantity}
        </li>
        <li className={style.productActionItem}>
          <Button onClick={handleRemove}>-</Button>
        </li>
      </ul>
    </article>
  )
}

export default ProductsListItem;