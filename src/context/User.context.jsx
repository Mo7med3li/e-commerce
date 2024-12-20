import { createContext, useState } from "react";

export let userContext = createContext(null);

export default function UserProvider({ children }) {
  let [token, setToken] = useState(localStorage.getItem("token"));
  function logOuT() {
    setToken(null);
    localStorage.removeItem("token");
  }
  return (
    <userContext.Provider value={{ token, setToken, logOuT }}>
      {children}
    </userContext.Provider>
  );
}
