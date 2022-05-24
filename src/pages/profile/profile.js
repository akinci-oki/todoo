import React, { useEffect, useState } from "react";
import * as firebase from "firebase";

function Profile() {
    const [users, setUsers] = useState();
    useEffect(() => {
        firebase
            .database()
            .ref("/")
            .once("value")
            .then((snapshot) => {
                const data = snapshot.val();
                console.log(data);
                setUsers(data);
            });
    }, []);
    return <div className="profile">profile</div>;
}

export default Profile;
