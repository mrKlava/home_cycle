import { useOutletContext } from "react-router-dom";
import { BikesLayout } from "../../layouts";

/**
 * ### useBikesContext
 * 
 * Custom hook to interact with Bikes Context
 * 
 */
const useBikesContext = () => {
  const context = useOutletContext(BikesLayout);

  if (context === undefined) {
    throw new Error("useBikesContext must be used within a Bikes Layout");
  }
  return context;
};

export default useBikesContext;