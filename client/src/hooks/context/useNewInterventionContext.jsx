import { useContext } from "react";

import { InterventionContext } from "../../context/interventionContext";

/**
 * ### useAuthContext
 * 
 * Custom hook to interact with Auth Context
 * 
 */
const useNewInterventionContext = () => {
  const context = useContext(InterventionContext);

  if (context === undefined) {
    throw new Error("useNewInterventionContext must be used within a InterventionContextProvider");
  }
  return context;
};

export default useNewInterventionContext;