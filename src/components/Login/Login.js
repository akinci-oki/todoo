import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { Spinner } from "../../components";
import { useUser } from "../../context";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        email: null,
        api: null,
    });
    const { user, setUser } = useUser();

    async function onLogin() {
        setError({
            email: null,
        });
        if (email.length < 1) {
            setError(() => ({
                email: "please fill in your email.",
            }));
            return;
        }
        setIsLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:4000/api/users/getByEmail",
                {
                    email,
                }
            );
            const user = response.data;
            setUser(user);
            Cookies.set("UID", user.id, { expires: 7 });
            setIsLoading(false);
            navigate("/profile");
        } catch (error) {
            if (error.message === "Request failed with status code 404") {
                setError(() => ({
                    api: "There's no user found!",
                }));
            }
            setIsLoading(false);
        }
    }

    return (
        <div className="login">
            <h2> Profile </h2>
            <div className="input-container">
                <label> e-mail </label>
                <input
                    placeholder="@email.com"
                    type="text"
                    id="email"
                    onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                    }}
                />
                {error.email && <p className="error">{error.email}</p>}
            </div>
            <div>
                <label class="container">
                    <input type="checkbox" />
                    <span className="check-label"> Remember me </span>
                    <span class="checkmark"></span>
                </label>
            </div>
            <div>
                <button type="submit" onClick={onLogin} disabled={isLoading}>
                    {isLoading ? <Spinner /> : "log in"}
                </button>
                {error.api && <p className="error">{error.api}</p>}
            </div>
        </div>
    );
}

export default Login;
