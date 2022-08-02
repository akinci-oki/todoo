import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        firstName: null,
        lastName: null,
        email: null,
    });

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        try {
            const response = await axios.get("http://localhost:4000/api/users");
            console.log(response);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function onAddUser() {
        setError({
            firstName: null,
            lastName: null,
            email: null,
        });
        if (firstName.length < 1) {
            console.error("firstname");
            console.log(JSON.parse(JSON.stringify(error)));
            setError({
                firstName: "please fill in your first name.",
            });
        }
        if (lastName.length < 1) {
            console.error("lastname");
            console.log(JSON.parse(JSON.stringify(error)));

            setError({ ...error, lastName: "please fill in your last name." });
        }
        if (email.length < 1) {
            console.error("email");
            console.log(JSON.parse(JSON.stringify(error)));

            setError({ ...error, email: "please fill in your email." });
        }
        if (firstName.length < 1 || lastName.length < 1 || email.length < 1) {
            console.error("ALL!");
            console.log(JSON.parse(JSON.stringify(error)));

            return;
        }

        try {
            await axios.post("http://localhost:4000/api/users", {
                firstName,
                lastName,
                email,
            });
            getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2> Profile </h2>
            <form>
                <div className="input-container">
                    <label> first name </label>
                    <input
                        placeholder="Jason"
                        type="text"
                        id="desc"
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
                        id="desc"
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
                    <label> email </label>
                    <input
                        placeholder="@email.com"
                        type="text"
                        id="desc"
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
                        onClick={(e) => {
                            e.preventDefault();
                            onAddUser(e);
                        }}
                    >
                        sign up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
