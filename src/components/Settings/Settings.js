import { ReactComponent as EditNameIcon } from "../../icons/edit-name-icon.svg";
import { ReactComponent as PickAColorIcon } from "../../icons/pick-a-color-icon.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
import PropTypes from "prop-types";
import NewCategoryForm from "../NewCategoryForm";
import { useState } from "react";

const Settings = ({ categories }) => {
    console.log(categories);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const onEdit = (id) => {
        console.log("edit", id);
    };
    const onColor = (id) => {
        console.log("color", id);
    };
    const onDelete = (id) => {
        console.log("delete", id);
    };

    const onToggleForm = () => setIsFormOpen(!isFormOpen);

    return (
        <div className="settings">
            <h2> My categories </h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <div className="cat-label">
                            <div className={`bolletje ${category.color}`} />
                            {category.desc}
                        </div>
                        <span className="icon-container">
                            <span
                                className="icon"
                                onClick={() => onEdit(category.id)}
                            >
                                <EditNameIcon />
                            </span>
                            <span
                                className="icon"
                                onClick={() => onColor(category.id)}
                            >
                                <PickAColorIcon />
                            </span>
                            <span
                                className="icon"
                                onClick={() => onDelete(category.id)}
                            >
                                <DeleteIcon />
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
            <button className="primary" onClick={() => onToggleForm()}>
                add new category
            </button>
            <div className={`form-container ${isFormOpen ? "form-open" : ""}`}>
                <NewCategoryForm />
            </div>
            {/* <button className="secondary"> cancel </button> */}
        </div>
    );
};

Settings.propTypes = {
    categories: PropTypes.object,
};

export default Settings;
