import { useContext } from "react"

import { AuthContext } from "../../context/authContext"

/**
 * ### useAuthContext
 * 
 * Custom hook to interact with Auth Context
 * 
 */
const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default useAuthContext;