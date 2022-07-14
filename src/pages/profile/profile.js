import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

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
        try {
            await axios.post("http://localhost:4000/api/users", {
                name: name,
                email: email,
                statistics: {
                    registrationDate: "05.07.2022",
                    totalOnlineTime: 5,
                },
                todos: ["string"],
            });
            getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form>
                <div className="input-container">
                    <label> name </label>
                    <input
                        placeholder="your name"
                        type="text"
                        id="desc"
                        onChange={(e) => {
                            e.preventDefault();
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="input-container">
                    <label> email </label>
                    <input
                        placeholder="your email"
                        type="text"
                        id="desc"
                        onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                        }}
                    />
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
                        add
                    </button>
                </div>
            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Email </th>
                            <th> Name </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td> {user.id} </td>
                                    <td> {user.email} </td>
                                    <td> {user.name} </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Profile;
