import React, { useState } from "react";
const axios = require("axios");

function Api() {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    // const person = {
    //     name: "Luke Skywalker",
    //     height: "172",
    //     mass: "77",
    // };
    async function getLuke() {
        setLoading(true);
        try {
            const response = await axios.get("https://swapi.dev/api/people/1");
            console.log(response.data);
            setPerson(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="api">
            <h1>Profile</h1>
            {loading && <span>loading...</span>}
            {person !== null && (
                <ul>
                    <li>{person.name}</li>
                    <li>{person.height} cm</li>
                    <li>{person.mass} kg</li>
                </ul>
            )}

            <button className="doesntmatter" onClick={getLuke}>
                GET ME LUKE!
            </button>
        </div>
    );
}

export default Api;
