import PropTypes from "prop-types";
import { Spinner } from "../../components";

function Modal(props) {
    return (
        <div className="modal-container">
            <div className="Modal">
                <p>
                    {/* Are you sure you want to delete list &quot;
                    {props.listDesc}&quot;? */}
                </p>
                {props.children}
                <button
                    disabled={props.isLoading}
                    className="warning secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        props.onCancel();
                    }}
                >
                    {props.cancelButtonText}
                </button>
                <button
                    className="warning primary"
                    disabled={props.isLoading}
                    onClick={(e) => {
                        e.preventDefault();
                        props.onConfirm();
                    }}
                >
                    {props.isLoading ? <Spinner /> : props.confirmButtonText}
                </button>
            </div>
        </div>
    );
}
Modal.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    // onDeleteList: PropTypes.func,
    // listDesc: PropTypes.string,
};

export default Modal;
