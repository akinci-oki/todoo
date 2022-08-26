import React, { useState, useEffect } from "react";
import { userContext } from "./context";
import axios from "axios";
import Cookies from "js-cookie";
import { Menu, Error } from "./components";
import Router from "./Router";

function App() {
    const [error, setError] = useState({
        api: null,
    });
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
            setError((error) => ({
                api: "something went wrong, please try again.",
            }));
        }
    }

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
            {error.api && <Error />}
        </div>
    );
}
export default App;
