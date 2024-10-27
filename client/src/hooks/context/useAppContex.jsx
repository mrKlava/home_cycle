// import { useContext } from "react"

import { AuthContext } from "../../context/authContext"
import { useOutletContext } from "react-router-dom";

/**
 * ### useAuthContext
 * 
 * Custom hook to interact with Auth Context
 * 
 */
const useAppContext = () => {
  const context = useOutletContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a App Layout");
  }
  return context;
};

export default useAppContext;