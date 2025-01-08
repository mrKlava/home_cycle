import { ProductsListItem } from "..";
import { useNewInterventionContext } from "../../hooks";

import style from "./style.module.scss";

/**
 * ### Product List
 *  
 * Renders list of Products if there is at least one product, 
 * if no will render message saying that there is no products
 */
function ProductsList({ products = [] }) {
  const { productsAdded } = useNewInterventionContext();

  return (
    <section className={style.products}>
      {
        products && products.length
          ? products.map((product) => (
            <ProductsListItem
              key={product.productId}
              product={product}
              quantity={productsAdded[product.productId] ? productsAdded[product.productId].quantity : 0}
            />
          ))
          : <h3>No products where found</h3>
      }
    </section>
  )
}

export default ProductsList;