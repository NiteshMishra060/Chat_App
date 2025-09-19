// TokenContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const TokenContext = createContext();

// Create a custom hook for consuming the context
export const useToken = () => useContext(TokenContext);

// Provider component
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token")); // Load from localStorage

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
