import React, { useState } from "react";
import axios from "axios";
import { Spinner, Error } from "../../components";
import { ReactComponent as ErrorIconRed } from "../../icons/error-icon-red.svg";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        firstName: null,
        lastName: null,
        email: null,
        api: null,
    });

    async function onAddUser() {
        setError({
            firstName: null,
            lastName: null,
            email: null,
            api: null,
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
            await axios.post("http://localhost:4000/api/users", {
                firstName,
                lastName,
                email,
            });
            setIsLoading(false);
        } catch (error) {
            const errorMessage = "bad input: email already in use";

            if (
                error.response.data.message ===
                "bad input: email already in use"
            ) {
                setError((error) => ({
                    ...error,
                    api: "e-mail address is already in use.",
                }));
            } else {
                setError((error) => ({
                    ...error,
                    api: "something went wrong, please try again.",
                }));
            }
            console.log(error.response.data.message);
            console.error(error);
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
                        id="email"
                        onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                        }}
                    />
                    {error.email && <p className="error">{error.email}</p>}
                </div>

                <div>
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
                    {error.api && <Error />}
                </div>
            </form>
        </div>
    );
}
export default SignUp;
