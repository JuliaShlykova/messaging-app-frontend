import React, { createContext, useContext, useReducer } from "react";

const loadingContext = React.createContext();

export const useLoading = () => useContext(loadingContext);

export default function LoadingProvider({children}) {
  const [loading, toggleLoading] = useReducer(load=>!load, false);
  return (
    <loadingContext.Provider value={{loading, toggleLoading}}>
      {children}
    </loadingContext.Provider>
  )
}