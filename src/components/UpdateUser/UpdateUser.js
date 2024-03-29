import { useState, useEffect } from "react";
import axios from "axios";

import { useUser } from "../../context";
import { Error, Spinner, Success } from "../../components";
import { isEmailValid } from "../../utils";

function UpdateUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState({
        firstName: null,
        lastName: null,
        email: null,
        emailValid: null,
    });

    const { user, setUser } = useUser();

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setIsButtonDisabled(true);
    }, [user]);

    useEffect(() => {
        checkIfDataChange();
    }, [firstName, lastName, email]);

    async function onUpdateUser() {
        setSuccess(false);
        setError(() => ({
            api: null,
        }));
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
            const response = await axios.put(`http://localhost:4000/api/users/${user.id}`, {
                firstName,
                lastName,
                email,
            });
            setSuccess(true);
            setUser(response.data);
            setIsLoading(false);
        } catch (apiError) {
            setError(() => ({
                api: "something went wrong, please try again.",
            }));
            /* eslint-disable-next-line no-console */
            console.error(apiError);
            setIsLoading(false);
        }
    }

    function checkIfDataChange() {
        if (user.firstName === firstName && user.lastName === lastName && user.email === email) {
            setIsButtonDisabled(true);
        }

        if (user.firstName !== firstName || user.lastName !== lastName || user.email !== email) {
            setIsButtonDisabled(false);
        }
    }

    return (
        <div className="update-user">
            <h2> Profile </h2>
            <form>
                <div className="input-container">
                    <label> first name </label>
                    <input
                        value={firstName}
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
                        value={lastName}
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
                        value={email}
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
                        disabled={isButtonDisabled || isLoading}
                        className="primary"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            onUpdateUser(e);
                        }}
                    >
                        {isLoading ? <Spinner /> : "update"}
                    </button>
                    {success && <Success message="successfully updated." />}
                    {error.api && <Error message={error.api} />}
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;
