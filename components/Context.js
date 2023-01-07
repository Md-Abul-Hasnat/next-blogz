import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || {});
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
