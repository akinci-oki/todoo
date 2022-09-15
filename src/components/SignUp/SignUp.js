import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Spinner, Error } from "../../components";
import { useUser } from "../../context";
import { isEmailValid } from "../../utils";

function SignUp() {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        firstName: null,
        lastName: null,
        email: null,
        emailValid: null,
        api: null,
    });

    async function onAddUser() {
        setError({
            firstName: null,
            lastName: null,
            email: null,
            emailValid: null,
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
        } else if (!isEmailValid(email)) {
            setError(() => ({
                emailValid: "Please enter a valid e-mail address.",
            }));
        }
        if (firstName.length < 1 || lastName.length < 1 || email.length < 1 || !isEmailValid(email)) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:4000/api/users", {
                firstName,
                lastName,
                email,
            });
            setIsLoading(false);
            const user = response.data;
            Cookies.set("UID", user.id, { expires: 7 });
            setUser(user);
            navigate("/profile?welcome=true");
        } catch (error) {
            /*  */
            if (error.response.data.message === "bad input: email not unique") {
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
                        disabled={isLoading}
                        type="text"
                        id="firstname"
                        onChange={(e) => {
                            e.preventDefault();
                            setFirstName(e.target.value);
                        }}
                    />
                    {error.firstName && <p className="error">{error.firstName}</p>}
                </div>
                <div className="input-container">
                    <label> last name </label>
                    <input
                        placeholder="Doe"
                        disabled={isLoading}
                        type="text"
                        id="lastname"
                        onChange={(e) => {
                            e.preventDefault();
                            setLastName(e.target.value);
                        }}
                    />
                    {error.lastName && <p className="error">{error.lastName}</p>}
                </div>
                <div className="input-container">
                    <label> e-mail </label>
                    <input
                        placeholder="@email.com"
                        disabled={isLoading}
                        type="text"
                        id="email"
                        onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                        }}
                    />
                    {error.email && <p className="error">{error.email}</p>}
                    {error.emailValid && <p className="error">{error.emailValid}</p>}
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
                    {error.api && <Error message={error.api} />}
                </div>
            </form>
        </div>
    );
}
export default SignUp;
