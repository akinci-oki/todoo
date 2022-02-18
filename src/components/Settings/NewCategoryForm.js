import { useState } from "react";

function NewCategoryForm(props) {
    const [categoryname, setCategoryname] = useState("");
    const [color, setColor] = useState("col-1");
    return (
        <div className="NewCategoryForm">
            <h2> New category </h2>
            <form>
                <div className="input-container">
                    <label>name</label>
                    <input
                        value={categoryname}
                        onChange={(e) => {
                            e.preventDefault();
                            setCategoryname(e.target.value);
                        }}
                        type="text"
                        id="my-input"
                    />
                </div>
                <div className="input-container">
                    <label>pick a color</label>

                    <div className="button-container">
                        {props.colors.map((propColor, index) => (
                            <button
                                className={`color-button ${propColor.id} ${
                                    propColor.id === color ? "selected" : ""
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setColor(propColor.id);
                                }}
                            ></button>
                        ))}
                    </div>
                </div>
                <div>
                    <button
                        className="primary"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onAddCategory(categoryname, color);
                        }}
                    >
                        add category
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

export default NewCategoryForm;
