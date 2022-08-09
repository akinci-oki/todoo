import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        email: null,
        api: null,
    });

    async function onLogin() {
        setError({
            email: null,
        });
        if (email.length < 1) {
            setError(() => ({
                email: "please fill in your email.",
            }));
        }
        try {
            const response = await axios.post(
                "http://localhost:4000/api/users/getByEmail",
                {
                    email,
                }
            );
            const user = response.data;
            console.log(user);
        } catch (error) {
            if (error.message === "Request failed with status code 404") {
                setError(() => ({
                    api: "There's no user found!",
                }));
            }
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
                <button type="submit" onClick={onLogin}>
                    log in
                </button>
                {error.api && <p className="error">{error.api}</p>}
            </div>
        </div>
    );
}

export default Login;
