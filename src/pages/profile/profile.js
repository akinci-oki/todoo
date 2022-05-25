import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db as database } from "../../firebase";

function Profile() {
    const [users, setUsers] = useState([]);
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
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div className="profile">
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
        </div>
    );
}

export default Profile;
