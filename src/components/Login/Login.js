import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ReactComponent as ErrorIconRed } from "../../icons/error-icon-red.svg";

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
            } else {
                setError((error) => ({
                    ...error,
                    api: "something went wrong, please try again.",
                }));
            }
            setIsLoading(false);
        }
    }

    return (
        <div className="login">
            <h2> Profile </h2>
            <form>
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
                    <label className="container">
                        <input type="checkbox" />
                        <span className="check-label"> Remember me </span>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={onLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : "log in"}
                    </button>
                    {error.api && (
                        <div className="error-red">
                            <span className="icon">
                                <ErrorIconRed />
                            </span>
                            <p className="error">{error.api}</p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Login;
