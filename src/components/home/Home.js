import "../../App.scss";
import { useState } from "react";
import categories from "../../categories";

function Home() {
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
            <div>
                <button className="primary" onClick={onToggleForm}>
                    add new to do
                </button>
            </div>
            {isFormOpen && (
                <>
                    <div className="input-container">
                        <label> description </label>
                        <input placeholder="to do" type="text" id="desc" />
                    </div>

                    <div className="input-container">
                        <label> category </label>
                        <select name="pets" id="pet-select">
                            <option value="">make a choice</option>
                            <option value="personal">personal</option>
                            <option value="professional">professional</option>
                            <option value="kids">kids</option>
                        </select>
                        <div>
                            <button
                                className="secondary"
                                onClick={() => console.log("working!")}
                            >
                                add
                            </button>
                        </div>
                    </div>
                </>
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
                            <p> {toDo.name} </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
