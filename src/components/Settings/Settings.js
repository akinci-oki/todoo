import { ReactComponent as EditNameIcon } from "../../icons/edit-name-icon.svg";
import { ReactComponent as PickAColorIcon } from "../../icons/pick-a-color-icon.svg";
/* eslint-disable */
import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
import PropTypes from "prop-types";
import { ListForm } from "../../components";
import { useState } from "react";
import Modal from "./Modal";

const Settings = ({ lists, onAddList, onEditList, colors, onDeleteList }) => {
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isNewFormOpen, setIsNewFormOpen] = useState(false);
    const [selectedListId, setSelectedListId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getListDesc = (id) => lists.find((list) => list.id === id).desc;

    const onToggleEdit = (id) => {
        onToggleEditForm();
        setSelectedListId(id);
    };
    const onColor = (id) => {
        console.log("color", id);
    };
    const onToggleDelete = (id) => {
        setIsModalOpen(true);
        setIsEditFormOpen(false);
        setIsNewFormOpen(false);
        setSelectedListId(id);
        document.body.style.overflow = "hidden";
    };
    const onCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    const onConfirmDelete = () => {
        onCloseModal();
        onDeleteList(selectedListId);
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

    const onSubmitEditListForm = (newName) => {
        onEditList(selectedListId, newName);
    };

    return (
        <div className="settings">
            <h2> My lists </h2>
            <ul>
                {lists.map(
                    (list, index) =>
                        !list.deprecated && (
                            <li key={index}>
                                <div className="list-label">
                                    <div className={`bolletje ${list.color}`} />
                                    <div className="list-desc">{list.desc}</div>
                                </div>
                                <span className="icon-container">
                                    <span
                                        className="icon"
                                        onClick={() => onToggleEdit(list.id)}
                                    >
                                        <EditNameIcon />
                                    </span>
                                    <span
                                        className="icon"
                                        onClick={() => onColor(list.id)}
                                    >
                                        <PickAColorIcon />
                                    </span>
                                    <span
                                        className="icon"
                                        onClick={() => onToggleDelete(list.id)}
                                    >
                                        <DeleteIcon />
                                    </span>
                                </span>
                            </li>
                        ),
                )}
            </ul>
            <button
                className="primary"
                onClick={() => onToggleNewForm()}
            >
                add new list
            </button>
            {isNewFormOpen && (
                <div className={"new-form-container"}>
                    <ListForm
                        onAddList={onAddList}
                        onToggleForm={onToggleNewForm}
                        colors={colors}
                        mode="new"
                        title="New list"
                        buttonLabel="add list"
                    />
                </div>
            )}
            {isEditFormOpen && (
                <div className={"edit-form-container"}>
                    <ListForm
                        onEditList={onSubmitEditListForm}
                        onToggleForm={onToggleEditForm}
                        colors={colors}
                        isColorPickerHidden
                        mode="edit"
                        title="Edit list"
                        buttonLabel="update list"
                    />
                </div>
            )}
            {/* <button className="secondary"> cancel </button> */}
            {isModalOpen && (
                <Modal
                    onCancel={onCloseModal}
                    listDesc={getListDesc(selectedListId)}
                    onDeleteList={onConfirmDelete}
                />
            )}
        </div>
    );
};

Settings.propTypes = {
    lists: PropTypes.array,
    onAddList: PropTypes.func,
    onEditList: PropTypes.func,
    colors: PropTypes.array,
};

export default Settings;
