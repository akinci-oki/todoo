import React, { useState } from "react";
import { userContext } from "./context";
import { Menu } from "./components";
import Router from "./Router";

function App() {
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    return (
        <div className="App">
            <userContext.Provider
                value={{
                    user,
                    setUser,
                }}
            >
                <Menu />
                <Router />
            </userContext.Provider>
        </div>
    );
}
export default App;
