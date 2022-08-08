import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="NotFound">
            <h1>404</h1>
            <p>Uh-oh... seems like you’re lost. We couldn’t find that page.</p>

            <div>
                <button className="primary">
                    <Link to="/">take me home scotty!</Link>
                </button>
            </div>
        </div>
    );
}

export default NotFound;
