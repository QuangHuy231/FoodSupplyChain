import { createContext, useState } from "react";

export const Context = createContext({});

export function ContextProvider({ children }) {
  const [heading, setHeading] = useState("Home");

  return (
    <Context.Provider value={{ heading, setHeading }}>
      {children}
    </Context.Provider>
  );
}
