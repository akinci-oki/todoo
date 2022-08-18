import React, { useState, useEffect } from "react";
import { userContext } from "./context";
import axios from "axios";
import Cookies from "js-cookie";
import { Menu } from "./components";
import Router from "./Router";

function App() {
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        const UID = Cookies.get("UID");
        if (UID && UID.length > 0) {
            getUser(UID);
        }
    }, []);

    async function getUser(UID) {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/users/" + UID
            );
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    /* inside of useEffect, after you got the cookie. Do a Get API call to users/user.id*/
    /* if there's a user, setUser on the context */

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
