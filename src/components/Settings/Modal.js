import PropTypes from "prop-types";

function Modal(props) {
    return (
        <div className="modal-container">
            <div className="Modal">
                <p>
                    Are you sure you want to delete category &quot;
                    {props.categoryDesc}&quot;?
                </p>
                <button
                    className="secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        props.onCancel();
                    }}
                >
                    cancel
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        props.onDeleteCategory();
                    }}
                >
                    delete category
                </button>
            </div>
        </div>
    );
}
Modal.propTypes = {
    onDeleteCategory: PropTypes.func,
    onCancel: PropTypes.func,
    categoryDesc: PropTypes.string,
};

export default Modal;
