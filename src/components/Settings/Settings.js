import { ReactComponent as EditNameIcon } from "../../icons/edit-name-icon.svg";
import { ReactComponent as PickAColorIcon } from "../../icons/pick-a-color-icon.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
import PropTypes from "prop-types";
import CategoryForm from "./CategoryForm";
import { useState } from "react";

const Settings = ({ categories, onAddCategory, onEditCategory, colors }) => {
    console.log(categories);

    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isNewFormOpen, setIsNewFormOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const onEdit = (id) => {
        onToggleEditForm();
        setSelectedCategoryId(id);
        console.log(
            "edit",
            categories.find((category) => category.id === id).desc
        );
    };
    const onColor = (id) => {
        console.log("color", id);
    };
    const onDelete = (id) => {
        console.log("delete", id);
    };

    const onToggleNewForm = () => {
        setIsNewFormOpen(!isNewFormOpen);
        setIsEditFormOpen(false);
    };
    const onToggleEditForm = () => {
        setIsEditFormOpen(true);
        setIsNewFormOpen(false);
    };

    const onSubmitEditCategoryForm = (newName) => {
        onEditCategory(selectedCategoryId, newName);
    };

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
            <button className="primary" onClick={() => onToggleNewForm()}>
                add new category
            </button>
            <div
                className={`new-form-container ${
                    isNewFormOpen ? "new-form-open" : ""
                }`}
            >
                <CategoryForm
                    onAddCategory={onAddCategory}
                    onToggleForm={onToggleNewForm}
                    colors={colors}
                    mode="new"
                    title="New category"
                    buttonLabel="add category"
                />
            </div>

            <div
                className={`edit-form-container ${
                    isEditFormOpen ? "edit-form-open" : ""
                }`}
            >
                <CategoryForm
                    onEditCategory={onSubmitEditCategoryForm}
                    onToggleForm={onToggleEditForm}
                    colors={colors}
                    isColorPickerHidden
                    mode="edit"
                    title="Edit category"
                    buttonLabel="update category"
                />
            </div>

            {/* <button className="secondary"> cancel </button> */}
        </div>
    );
};

Settings.propTypes = {
    categories: PropTypes.array,
    onAddCategory: PropTypes.func,
    onEditCategory: PropTypes.func,
    colors: PropTypes.array,
};

export default Settings;
