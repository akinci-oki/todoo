import React, { useState } from "react";
const axios = require("axios");

function Api() {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [error, setError] = useState("");

    async function getInfo() {
        setLoading(true);
        setError("");
        setPerson(null);
        try {
            const response = await axios.get(
                `https://swapi.dev/api/people/${id}`
            );
            console.log(response.data);
            setPerson(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
            console.error(error.message);
        }
    }
    return (
        <div className="api">
            <h1>Profile</h1>

            <div className="input-container">
                <label> id </label>
                <input
                    value={id}
                    placeholder="e.g 1"
                    onChange={(e) => {
                        e.preventDefault();
                        console.log(e.target.value);
                        setId(e.target.value);
                    }}
                    type="number"
                    id="my-input"
                />
            </div>

            {error.length > 0 && <span> {error} </span>}
            {loading && <span>loading...</span>}
            {person !== null && (
                <ul>
                    <li>{person.name}</li>
                    <li>{person.height} cm</li>
                    <li>{person.mass} kg</li>
                </ul>
            )}

            <button className="info" onClick={getInfo}>
                Get me the info
            </button>
        </div>
    );
}

export default Api;
