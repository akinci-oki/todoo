import "../../App.scss";
import { useState } from "react";
import { categories } from "../../categories";

function Home() {
    const [toDoName, setToDoName] = useState();
    const [toDoCategory, setToDoCategory] = useState();
    const [isFormOpen, setIsFormOpen] = useState(false);
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
                    <button className="primary" onClick={onToggleForm}>
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
                                setToDoName(e.target.value);
                            }}
                        />
                    </div>

                    <div className="input-container">
                        <label> category </label>
                        <select
                            name="pets"
                            id="pet-select"
                            onChange={(e) => {
                                setToDoCategory(e.target.value);
                            }}
                        >
                            <option value="">make a choice</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.desc}
                                </option>
                            ))}
                        </select>
                        <div>
                            <button
                                className="primary"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setToDos([
                                        ...toDos,
                                        {
                                            name: toDoName,
                                            category: toDoCategory,
                                            isDone: false,
                                        },
                                    ]);
                                }}
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
