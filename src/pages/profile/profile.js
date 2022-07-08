import React, { useEffect, useState } from "react";
import { set, ref, onValue } from "firebase/database";
import { db as database } from "../../firebase";

function Profile() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function createUniqueID() {
        return Math.floor(Math.random() * Date.now());
    }
    async function getUsers() {
        // https://firebase.google.com/docs/database/web/read-and-write?authuser=0
        const usersRef = ref(database, "users/");
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            setUsers(data);
        });
    }

    async function createUser() {
        // https://firebase.google.com/docs/database/web/read-and-write?hl=en#write_data
        setLoading(true);
        setError("");
        console.log(users.length)
        try {
            set(ref(database, "users/" + users.length), {
                email: "jane@email.com",
                id: createUniqueID(),
                name: "Jane Doe",
                statistics: {
                    registrationDate: "05.07.2022",
                    totalOnlineTime: 0,
                },
            }).then((data) => {
                console.log(data)
                setLoading(false);
            });
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div className="profile">
            {loading && <span>loading...</span>}

            {users && users.length && (
                <ul>
                    {users.map((user) => {
                        return (
                            <li key={user.id}>
                                {user.id}: {user.name}
                            </li>
                        );
                    })}
                </ul>
            )}

            <button onClick={createUser}>create user</button>
            {error && <p>error</p>}
        </div>
    );
}

export default Profile;
