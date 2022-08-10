import { createContext, useContext } from "react";

export const userContext = createContext({
    user: "null",
    // setUser: (user) => console.warn("No userContext provider."),
});
export const useUser = () => useContext(userContext);
