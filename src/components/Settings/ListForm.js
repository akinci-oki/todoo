/* eslint-disable */

import { useState } from "react";

function ListForm(props) {
    const [listname, setListname] = useState("");
    const [color, setColor] = useState("col-1");
    return (
        <div className="ListForm">
            <h2> {props.title} </h2>
            <form>
                <div className="input-container">
                    <label>name</label>
                    <input
                        value={listname}
                        onChange={(e) => {
                            e.preventDefault();
                            setListname(e.target.value);
                        }}
                        type="text"
                        id="my-input"
                    />
                </div>
                <div className={`input-container ${props.isColorPickerHidden ? "hide-colors" : ""}`}>
                    <label>pick a color</label>

                    <div className="button-container">
                        {props.colors.map((propColor, index) => {
                            return (
                                <button
                                    className={`color-button ${propColor.id} ${propColor.id === color ? "selected" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setColor(propColor.id);
                                    }}
                                    key={propColor.id}
                                ></button>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <button
                        className="primary"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            if (props.mode === "new") {
                                props.onAddList(listname, color);
                            } else if (props.mode === "edit") {
                                props.onEditList(listname);
                            }
                        }}
                    >
                        {props.buttonLabel}
                    </button>
                    <button
                        className="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onToggleForm();
                            console.log("cancel");
                        }}
                    >
                        cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ListForm;
