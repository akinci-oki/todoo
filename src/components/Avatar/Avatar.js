import { useUser } from "../../context";
import { Link } from "react-router-dom";

function Avatar() {
    const { user } = useUser();

    return (
        <Link to="/profile">
            <div className="avatar">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
            </div>
        </Link>
    );
}

export default Avatar;
