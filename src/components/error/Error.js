import PropTypes from "prop-types";
import { ReactComponent as ErrorIconRed } from "../../icons/error-icon-red.svg";

function Error(props) {
    return (
        <div className="error">
            <span className="icon">
                <ErrorIconRed />
            </span>
            <p>{props.message && props.message.length > 0 ? props.message : "something went wrong, please try again."}</p>
        </div>
    );
}
Error.propTypes = {
    message: PropTypes.string,
};

export default Error;
