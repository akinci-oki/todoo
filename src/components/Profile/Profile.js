import { Link } from "react-router-dom";
import { useUser } from "../../context";

function Profile() {
    const { user, setUser } = useUser();

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
                    <button> log out </button>
                </>
            )}

            {!user.firstName && (
                <>
                    <div>
                        <p>Want to be able to save your TO DO’s?</p>
                        <p>
                            Log in with your e-mail and pick up right where you
                            left off!
                        </p>
                    </div>
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
