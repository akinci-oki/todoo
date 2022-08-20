import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Spinner } from "../../components";
import { useUser } from "../../context";

function SignUp() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        firstName: null,
        lastName: null,
        email: null,
        emailInUse: null,
    });

    async function onAddUser() {
        setError({
            firstName: null,
            lastName: null,
            email: null,
        });
        if (firstName.length < 1) {
            setError((error) => ({
                ...error,
                firstName: "please fill in your first name.",
            }));
        }
        if (lastName.length < 1) {
            setError((error) => ({
                ...error,
                lastName: "please fill in your last name.",
            }));
        }
        if (email.length < 1) {
            setError((error) => ({
                ...error,
                email: "please fill in your email.",
            }));
        }
        if (firstName.length < 1 || lastName.length < 1 || email.length < 1) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:4000/api/users",
                {
                    firstName,
                    lastName,
                    email,
                }
            );
            setIsLoading(false);
            const user = response.data;
            setUser(user);
            navigate("/profile");
        } catch (error) {
            const errorMessage = "bad input: email already in use";

            if (
                error.response.data.message ===
                "bad input: email already in use"
            ) {
                setError((error) => ({
                    ...error,
                    emailInUse: "e-mail address is already in use.",
                }));
            }
            console.error(error);
            console.log(error.response.data.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="sign-up">
            <h2> Profile </h2>
            <form>
                <div className="input-container">
                    <label> first name </label>
                    <input
                        placeholder="Jason"
                        type="text"
                        disabled={isLoading}
                        id="firstname"
                        onChange={(e) => {
                            e.preventDefault();
                            setFirstName(e.target.value);
                        }}
                    />
                    {error.firstName && (
                        <p className="error">{error.firstName}</p>
                    )}
                </div>
                <div className="input-container">
                    <label> last name </label>
                    <input
                        placeholder="Doe"
                        type="text"
                        disabled={isLoading}
                        id="lastname"
                        onChange={(e) => {
                            e.preventDefault();
                            setLastName(e.target.value);
                        }}
                    />
                    {error.lastName && (
                        <p className="error">{error.lastName}</p>
                    )}
                </div>
                <div className="input-container">
                    <label> e-mail </label>
                    <input
                        placeholder="@email.com"
                        type="text"
                        disabled={isLoading}
                        id="email"
                        onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                        }}
                    />
                    {error.email && <p className="error">{error.email}</p>}
                </div>

                <div>
                    <Link to="/profile">
                        <button
                            className="primary"
                            type="submit"
                            disabled={isLoading}
                            onClick={(e) => {
                                e.preventDefault();
                                onAddUser(e);
                            }}
                        >
                            {isLoading ? <Spinner /> : "sign up"}
                        </button>
                    </Link>
                    {error.emailInUse && (
                        <p className="error">{error.emailInUse}</p>
                    )}
                </div>
            </form>
        </div>
    );
}

export default SignUp;
