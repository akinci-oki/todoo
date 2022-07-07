import "../../App.scss";
import { useState } from "react";
import { categories } from "../../categories";

function Home() {
    const [toDoName, setToDoName] = useState("");
    const [toDoCategory, setToDoCategory] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [errors, setErrors] = useState({
        toDoName: null,
        toDoCategory: null,
    });
    const [toDos, setToDos] = useState([
        {
            name: "Pick up Elif",
            category: "cat-01",
            isDone: true,
        },
        {
            name: "Get cokes",
            category: "cat-02",
            isDone: false,
        },
    ]);
    const onAddToDo = (e) => {
        e.preventDefault();
        if (
            !toDoName.length ||
            toDoCategory === "make a choice" ||
            toDoCategory === null
        ) {
            setErrors({
                ...errors,
                toDoName: "please fill in a description.",
                toDoCategory: "please pick a category.",
            });
            return;
        }
        setToDos([
            ...toDos,
            {
                name: toDoName,
                category: toDoCategory,
                isDone: false,
            },
        ]);
    };

    const onToggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };
    const getColorFromCategoryId = (categoryId) => {
        const selectedCategory = categories.find(
            (category) => category.id === categoryId
        );
        return selectedCategory.color;
    };
    return (
        <div className="home">
            {!isFormOpen && (
                <div>
                    <button
                        className="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleForm();
                        }}
                    >
                        add new to do
                    </button>
                </div>
            )}

            {isFormOpen && (
                <form>
                    <div className="input-container">
                        <label> description </label>
                        <input
                            placeholder="to do"
                            type="text"
                            id="desc"
                            onChange={(e) => {
                                e.preventDefault();
                                setErrors({ ...errors, toDoName: null });
                                setToDoName(e.target.value);
                            }}
                        />
                        {errors.toDoName && (
                            <p className="error">{errors.toDoName}</p>
                        )}
                    </div>

                    <div className="input-container">
                        <label> category </label>
                        <select
                            name="pets"
                            id="pet-select"
                            onChange={(e) => {
                                setToDoCategory(e.target.value);
                                setErrors({
                                    ...errors,
                                    toDoCategory: null,
                                });
                            }}
                        >
                            <option value={null}>make a choice</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.desc}
                                </option>
                            ))}
                        </select>
                        {errors.toDoCategory && (
                            <p className="error">{errors.toDoCategory}</p>
                        )}
                        <div>
                            <button
                                className="primary"
                                type="submit"
                                onClick={(e) => onAddToDo(e)}
                            >
                                add
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <ul>
                {toDos.map((toDo, index) => (
                    <li key={index}>
                        <div className="todoo">
                            <div
                                className={`bolletje ${getColorFromCategoryId(
                                    toDo.category
                                )}`}
                            />
                            <p className={`${toDo.isDone ? "done" : ""}`}>
                                {toDo.name}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
