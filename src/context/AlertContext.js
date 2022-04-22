import { createContext, useState } from "react";

export const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    state: false,
    text: "",
    severity: "error",
  });
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
