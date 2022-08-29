import { createContext, useContext } from "react";

export const userContext = createContext({
    user: { id: "", name: "", email: "" },
    /* eslint-disable-next-line no-console */
    setUser: (user) => console.warn("No userContext provider."),
});
export const useUser = () => useContext(userContext);
