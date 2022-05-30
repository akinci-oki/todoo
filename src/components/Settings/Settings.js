import { ReactComponent as EditNameIcon } from "../../icons/edit-name-icon.svg";
import { ReactComponent as PickAColorIcon } from "../../icons/pick-a-color-icon.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
import PropTypes from "prop-types";
import CategoryForm from "./CategoryForm";
import { useState } from "react";
import Modal from "./Modal";

const Settings = ({
    categories,
    onAddCategory,
    onEditCategory,
    colors,
    onDeleteCategory,
}) => {
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isNewFormOpen, setIsNewFormOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getCategoryDesc = (id) =>
        categories.find((category) => category.id === id).desc;

    const onToggleEdit = (id) => {
        onToggleEditForm();
        setSelectedCategoryId(id);
    };
    const onColor = (id) => {
        console.log("color", id);
    };
    const onToggleDelete = (id) => {
        setIsModalOpen(true);
        setIsEditFormOpen(false);
        setIsNewFormOpen(false);
        setSelectedCategoryId(id);
        document.body.style.overflow = "hidden";
    };
    const onCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    const onConfirmDelete = () => {
        onCloseModal();
        onDeleteCategory(selectedCategoryId);
    };

    /* only one form should be open at the same time...!!! */
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
                {categories.map(
                    (category, index) =>
                        !category.deprecated && (
                            <li key={index}>
                                <div className="cat-label">
                                    <div
                                        className={`bolletje ${category.color}`}
                                    />
                                    {category.desc}
                                </div>
                                <span className="icon-container">
                                    <span
                                        className="icon"
                                        onClick={() =>
                                            onToggleEdit(category.id)
                                        }
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
                                        onClick={() =>
                                            onToggleDelete(category.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </span>
                                </span>
                            </li>
                        )
                )}
            </ul>
            <button className="primary" onClick={() => onToggleNewForm()}>
                add new category
            </button>
            {isNewFormOpen && (
                <div className={"new-form-container"}>
                    <CategoryForm
                        onAddCategory={onAddCategory}
                        onToggleForm={onToggleNewForm}
                        colors={colors}
                        mode="new"
                        title="New category"
                        buttonLabel="add category"
                    />
                </div>
            )}
            {isEditFormOpen && (
                <div className={"edit-form-container"}>
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
            )}
            {/* <button className="secondary"> cancel </button> */}
            {isModalOpen && (
                <Modal
                    onCancel={onCloseModal}
                    categoryDesc={getCategoryDesc(selectedCategoryId)}
                    onDeleteCategory={onConfirmDelete}
                />
            )}
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
