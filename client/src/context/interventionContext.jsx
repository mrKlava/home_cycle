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

  /**
   * ### Increment selected one service by one
   * 
   * @param {object} service service id to be added
   */
  const addService = (service) => {
    
    const currentService = servicesAdded[service.serviceId] ? {...servicesAdded[service.serviceId]} : {quantity: 0, name: service.name, price: service.currentPrice};

    currentService.quantity = currentService.quantity + 1;

    console.log('current', currentService)

    setServicesAdded(prev => {
      const newState = {...prev}
      return {...newState, ...currentService};
    })

    console.log(servicesAdded)
  }

  /**
   * ### Decrement selected one service by one
   * 
   * @param {number} serviceId service id to be removed
   */
  const removeService = (serviceId) => {
    setServicesAdded(prev => {
      const newState = { ...prev };

      const currentService = newState[serviceId];

      if (currentService > 1) newState[serviceId] -= 1;
      if (currentService === 1) delete newState[serviceId];

      return newState;
    })
  }

  /* Updates isLoading status */
  useEffect(() => {
    setIsLoading(isLoadingBikes || isLoadingServices || isLoadingProducts || isLoadingTechnicians)
  }, [isLoadingBikes, isLoadingServices, isLoadingProducts, isLoadingTechnicians]);

  /* DEBUG */

  // useEffect(() => console.log(servicesAdded), [servicesAdded]);

  // return context
  return (
    <InterventionContext.Provider value={
      {
        isLoading
        , bikes
        , services
        , products
        , technicians

        , servicesAdded

        , addService
        , removeService
      }
    }>
      {children}
    </InterventionContext.Provider>
  )
}

export default InterventionContextProvider;