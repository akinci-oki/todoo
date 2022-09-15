import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useUser } from "../../context";
import { Success, Modal, Error } from "../../components";

function Profile() {
    const { user, setUser } = useUser();

    const searchParameters = useLocation().search;
    const welcome = new URLSearchParams(searchParameters).get("welcome");

    const [isLogoutDone, setIsLogoutDone] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        api: null,
    });

    const onLogout = () => {
        setUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
        });
        Cookies.remove("UID", { path: "/" });
        setIsLogoutDone(true);
    };

    async function onDelete() {
        setIsLoading(true);
        try {
            await axios.delete(`http://localhost:4000/api/users/${user.id}`, {
                user,
            });
            onLogout();
            setIsDeleted(true);
            setIsModalOpen(false);
        } catch {
            setError(() => ({
                api: "something went wrong, please try again.",
            }));
        }
        setIsLoading(false);
    }

    return (
        <div className="profile">
            <h2> Profile </h2>
            {user.firstName && (
                <>
                    {welcome && welcome.length && <Success message={`welcome ${user.firstName}!`} />}
                    <p>
                        You are currently logged in as&nbsp;
                        <strong className="strong">
                            {user.firstName}&nbsp;
                            {user.lastName} ({user.email})
                        </strong>
                    </p>
                    <p>
                        <Link
                            className="link"
                            to="/update-user"
                        >
                            update name or e-mail
                        </Link>
                    </p>
                    <p>
                        <a
                            className="link"
                            onClick={() => setIsModalOpen(true)}
                        >
                            delete my profile
                        </a>
                    </p>

                    <button onClick={onLogout}> log out </button>
                </>
            )}

            {!user.firstName && (
                <>
                    {isLogoutDone && !isDeleted && <Success message="You are now logged out!" />}
                    {isDeleted && <Success message="your profile was deleted" />}
                    {!isLogoutDone && (
                        <div>
                            <p>You need to log in to be able to use the app.</p>
                        </div>
                    )}
                    <div>
                        <Link to="/log-in">
                            <button> log in </button>
                        </Link>
                    </div>
                    {!isLogoutDone && (
                        <div>
                            <p>Don’t have a profile yet?</p>
                        </div>
                    )}
                    <div>
                        <Link to="/sign-up">
                            <button>sign up</button>
                        </Link>
                    </div>
                </>
            )}

            {isModalOpen && (
                <Modal
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={onDelete}
                    confirmButtonText={"delete profile"}
                    cancelButtonText={"cancel"}
                    isLoading={isLoading}
                >
                    {error.api ? (
                        <Error />
                    ) : (
                        <>
                            <h2> Are you sure? </h2>
                            <p>Are you sure you want to delete your profile?</p>
                            <p>
                                This can not be undone. All your todos, categories and personal information will be deleted.
                            </p>
                        </>
                    )}
                </Modal>
            )}
        </div>
    );
}

export default Profile;
