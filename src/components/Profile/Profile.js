import { Link } from "react-router-dom";
import { useUser } from "../../context";
import { useState } from "react";

import { ReactComponent as SuccessIcon } from "../../icons/success-icon.svg";

function Profile() {
    const { user, setUser } = useUser();
    const [isLogoutDone, setIsLogoutDone] = useState(false);

    const onLogout = () => {
        setUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
        });
        setIsLogoutDone(true);
    };

    return (
        <div className="profile">
            <h2> Profile </h2>
            {user.firstName && (
                <>
                    <p>You are currently logged in as</p>
                    <p>
                        <strong>
                            {user.firstName}&nbsp;
                            {user.lastName} ({user.email})
                        </strong>
                    </p>
                    <button onClick={onLogout}> log out </button>
                </>
            )}

            {!user.firstName && (
                <>
                    {isLogoutDone ? (
                        <div className="success">
                            <span className="icon">
                                <SuccessIcon />
                            </span>
                            <p> You are now logged out! </p>
                        </div>
                    ) : (
                        <div>
                            <p>Want to be able to save your TO DO’s?</p>
                            <p>
                                Log in with your e-mail and pick up right where
                                you left off!
                            </p>
                        </div>
                    )}
                    <div>
                        <button>
                            <Link to="/log-in">log in</Link>
                        </button>
                    </div>
                    <div>
                        <button>
                            <Link to="/sign-up">sign up</Link>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;
