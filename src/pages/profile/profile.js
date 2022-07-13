import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
    const [users, setUsers] = useState([]);

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
    return (
        <div>
            <ul>
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
            </ul>
        </div>
    );
}

export default Profile;
