function Modal(props) {
    return (
        <div className="modal-container">
            <div className="Modal">
                <p>
                    Are you sure you want to delete category "
                    {props.categoryDesc}"?
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

export default Modal;
