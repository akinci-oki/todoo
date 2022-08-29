import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context";
import { useState, useEffect } from "react";
import { Success } from "../../components";

function Profile() {
    const { user, setUser } = useUser();
    const [isLogoutDone, setIsLogoutDone] = useState(false);
    const searchParameters = useLocation().search;
    const welcome = new URLSearchParams(searchParameters).get("welcome");

    const onLogout = () => {
        setUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
        });
        setIsLogoutDone(true);
    };

    useEffect(() => {}, [searchParameters]);

    return (
        <div className="profile">
            <h2> Profile </h2>
            {welcome && welcome.length && (
                <Success message={`welcome ${user.firstName}!`} />
            )}
            {user.firstName && (
                <>
                    <p>
                        You are currently logged in as&nbsp;
                        <strong className="strong">
                            {user.firstName}&nbsp;
                            {user.lastName} ({user.email})
                        </strong>
                    </p>
                    <p>
                        <Link className="update-link" to="/update-user">
                            update name or e-mail
                        </Link>
                    </p>

                    <button onClick={onLogout}> log out </button>
                </>
            )}

            {!user.firstName && (
                <>
                    {isLogoutDone ? (
                        <Success message="You are now logged out!" />
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
                        <Link to="/log-in">
                            <button> log in </button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/sign-up">
                            <button>sign up</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;
