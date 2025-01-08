import { createContext, useEffect, useState } from "react";
import { ProductServices, ServiceServices, TechnicianServices, InterventionServices, BikeServices } from "../services";

import { useFetchData } from '../hooks';


// create context
export const InterventionContext = createContext();

/**
 * ### Intervention Context Provider
 * 
 * Use for new intervention creation
 */
const InterventionContextProvider = ({ children }) => {
  // fetch data for form
  const { data: bikes, isLoading: isLoadingBikes } = useFetchData(BikeServices.getBikes);
  const { data: services, isLoading: isLoadingServices } = useFetchData(ServiceServices.getServices);
  const { data: products, isLoading: isLoadingProducts } = useFetchData(ProductServices.getProducts);
  const { data: technicians, isLoading: isLoadingTechnicians } = useFetchData(TechnicianServices.getTechnicians);

  const [isLoading, setIsLoading] = useState(true);

  // const new intervention
  const [servicesAdded, setServicesAdded] = useState({});
  const [productsAdded, setProductsAdded] = useState({});

  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [timeSlots, setTimeSlots] = useState([])

  /**
   * ### Increment selected one service by one
   * 
   * @param {object} service service to be added
   */
  const addService = (service) => {
    const id = service.serviceId;
    if (!id) return;

    const currentService = servicesAdded[id]
      ? { ...servicesAdded[id] }
      : { quantity: 0, name: service.name, price: service.currentPrice, duration: service.duration };

    // check if service total duration is longer 4 hours, return
    if (totalTime + service.duration > 240) return;

    currentService.quantity += 1;

    setServicesAdded(prev => ({ ...prev, [id]: currentService }));
  }

  /**
   * ### Decrement selected one service by one
   * 
   * @param {object} serviceId service to be removed
   */
  const removeService = (service) => {
    const id = service.serviceId;
    if (!id) return;

    const currentService = servicesAdded[id];
    if (!currentService) return;
    if (currentService.quantity > 1) currentService.quantity -= 1;


    if (currentService.quantity === 1) {
      setServicesAdded(prev => {
        const newState = { ...prev };
        delete newState[id];

        return newState;
      })
    } else {
      setServicesAdded(prev => ({ ...prev, [id]: currentService }));
    }
  }


  /**
 * ### Increment selected one product by one
 * 
 * @param {object} product product to be added
 */
  const addProduct = (product) => {
    const id = product.productId;
    if (!id) return;

    const currentProduct = productsAdded[id]
      ? { ...productsAdded[id] }
      : { quantity: 0, name: product.name, price: product.currentPrice };

    currentProduct.quantity += 1;

    setProductsAdded(prev => ({ ...prev, [id]: currentProduct }));
  }

  /**
   * ### Decrement selected one product by one
   * 
   * @param {object} product product to be removed
   */
  const removeProduct = (product) => {
    const id = product.productId;
    if (!id) return;

    const currentProduct = productsAdded[id];
    if (!currentProduct) return;
    if (currentProduct.quantity > 1) currentProduct.quantity -= 1;


    if (currentProduct.quantity === 1) {
      setProductsAdded(prev => {
        const newState = { ...prev };
        delete newState[id];

        return newState;
      })
    } else {
      setProductsAdded(prev => ({ ...prev, [id]: currentProduct }));
    }
  }

  /* Updates isLoading status */
  useEffect(() => {
    setIsLoading(isLoadingBikes || isLoadingServices || isLoadingProducts || isLoadingTechnicians)
  }, [isLoadingBikes, isLoadingServices, isLoadingProducts, isLoadingTechnicians]);

  /* Update Price and time for services cart */
  useEffect(() => {
    const priceServices = Object.values(servicesAdded).reduce((accumulator, { quantity, price }) => {
      return accumulator + (quantity * price)
    }, 0);

    setTotalServicePrice(priceServices);

    const time = Object.values(servicesAdded).reduce((accumulator, { quantity, duration }) => {
      return accumulator + (quantity * duration)
    }, 0);

    setTotalTime(time);

  }, [servicesAdded]);

  /* Update Price for products cart */
  useEffect(() => {
    const priceProducts = Object.values(productsAdded).reduce((accumulator, { quantity, price }) => {
      return accumulator + (quantity * price)
    }, 0);

    setTotalProductPrice(priceProducts);
  }, [productsAdded])

  // return context
  return (
    <InterventionContext.Provider value={
      {
        isLoading
        , bikes
        , services
        , products
        , technicians

        , timeSlots

        , servicesAdded
        , productsAdded
        , totalServicePrice
        , totalProductPrice
        , totalTime

        , addService
        , addProduct
        , removeService
        , removeProduct
      }
    }>
      {children}
    </InterventionContext.Provider>
  )
}

export default InterventionContextProvider;