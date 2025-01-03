import { useOutletContext } from "react-router-dom";
import { InterventionsLayout } from "../../layouts";

/**
 * ### useInterventionsContext
 * 
 * Custom hook to interact with Interventions Context
 * 
 */
const useInterventionsContext = () => {
  const context = useOutletContext(InterventionsLayout);

  if (context === undefined) {
    throw new Error("useInterventionsContext must be used within a Interventions Layout");
  }
  return context;
};

export default useInterventionsContext;