import { useState, useEffect } from "react";
import axios from "axios";

import { useUser } from "../../context";
import { Spinner } from "../../components";

function UpdateUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [isUpdated, setIsUpdated] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState({
        firstName: null,
        lastName: null,
        email: null,
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
            setIsLoading(true);
        }
        try {
            await axios.put(`http://localhost:4000/api/users/${user.id}`, {
                firstName,
                lastName,
                email,
            });
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    function checkIfDataChange() {
        if (user.firstName !== firstName) {
            setIsButtonDisabled(false);
        }
        if (user.lastName !== lastName) {
            setIsButtonDisabled(false);
        }
        if (user.email !== email) {
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
                        // disabled={isDisabled || isLoading}
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
                        value={lastName}
                        // disabled={isDisabled || isLoading}
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
                        value={email}
                        // disabled={isDisabled || isLoading}
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
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;
