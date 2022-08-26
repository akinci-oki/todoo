import { ReactComponent as SuccessIcon } from "../../icons/success-icon.svg";

function Success(props) {
    return (
        <div className="success">
            <span className="icon">
                <SuccessIcon />
            </span>
            <p>
                {props.message && props.message.length > 0
                    ? props.message
                    : "Success"}
            </p>
        </div>
    );
}

export default Success;
