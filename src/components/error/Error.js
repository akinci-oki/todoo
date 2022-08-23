import { ReactComponent as ErrorIconRed } from "../../icons/error-icon-red.svg";

function Error() {
    return (
        <div>
            <div className="error-red">
                <span className="icon">
                    <ErrorIconRed />
                </span>
                <p>something went wrong, please try again.</p>
            </div>
        </div>
    );
}

export default Error;
