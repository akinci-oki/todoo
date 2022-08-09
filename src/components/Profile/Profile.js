import { Link } from "react-router-dom";

function Profile() {
    return (
        <div className="profile">
            <h2> Profile </h2>
            <div>
                <p>Want to be able to save your TO DO’s?</p>
                <p>
                    Log in with your e-mail and pick up right where you left
                    off!
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
        </div>
    );
}

export default Profile;
