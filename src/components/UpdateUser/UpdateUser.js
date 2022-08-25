import { useState, useEffect } from "react";

import { useUser } from "../../context";

function UpdateUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    // const [isUpdated, setIsUpdated] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    // const [error, setError] = useState({
    //     email: null,
    // });
    const { user } = useUser();

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setIsDisabled(true);
    }, [user]);

    useEffect(() => {
        onUpdate();
    }, [firstName, lastName, email]);

    const onUpdate = () => {
        if (user.firstName !== firstName) {
            setIsDisabled(false);
        }
        if (user.lastName !== lastName) {
            setIsDisabled(false);
        }
        if (user.email !== email) {
            setIsDisabled(false);
        }
    };

    return (
        <div className="update-user">
            <h2> Profile </h2>
            <form>
                <div className="input-container">
                    <label> first name </label>
                    <input
                        value={firstName}
                        type="text"
                        id="firstname"
                        onChange={(e) => {
                            e.preventDefault();
                            setFirstName(e.target.value);
                        }}
                    />
                </div>
                <div className="input-container">
                    <label> last name </label>
                    <input
                        value={lastName}
                        type="text"
                        id="lastname"
                        onChange={(e) => {
                            e.preventDefault();
                            setLastName(e.target.value);
                        }}
                    />
                </div>
                <div className="input-container">
                    <label> e-mail </label>
                    <input
                        value={email}
                        type="text"
                        id="email"
                        onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <button
                        disabled={isDisabled}
                        className="primary"
                        type="submit"
                    >
                        update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;
