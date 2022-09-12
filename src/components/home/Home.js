import "../../App.scss";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../../context";
import axios from "axios";
import { categories } from "../../categories";
import { Spinner, Error } from "../../components";
import { ReactComponent as PlusIcon } from "../../icons/plus-icon.svg";

function Home() {
    const { user } = useUser();
    const bottomRef = useRef(null);
    const [toDoName, setToDoName] = useState("");
    const [toDoCategory, setToDoCategory] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isToDoLoading, setIsToDoLoading] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
        toDoName: null,
        toDoCategory: null,
        api: null,
    });
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        getToDos();
    }, [user]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [isFormOpen]);

    async function getToDos() {
        if (!user.id) return;
        try {
            const response = await axios.get(`http://localhost:4000/api/todos/${user.id}`);
            setToDos(response.data);
        } catch (error) {
            /* eslint-disable-next-line no-console */
            console.error(error);
        }
    }

    async function onAddToDo(e) {
        setError({
            toDoName: null,
            toDoCategory: null,
        });
        e.preventDefault();
        if (toDoName.length < 1) {
            setError((error) => ({
                ...error,
                toDoName: "please fill in a description.",
            }));
        }
        if (toDoCategory === null || toDoCategory === "") {
            setError((error) => ({
                ...error,
                toDoCategory: "please pick a category.",
            }));
        }
        if (toDoName.length < 1 || toDoCategory === null || toDoCategory === "") {
            return;
        }
        setIsLoading(true);

        try {
            await axios.post(`http://localhost:4000/api/todos/${user.id}`, {
                name: toDoName,
                isDone: false,
                category: toDoCategory,
            });
            getToDos();
        } catch (error) {
            setErrors(() => ({
                api: "something went wrong, please try again.",
            }));

            /* eslint-disable-next-line no-console */
            console.error(error);
        }
        setIsLoading(false);
    }
    async function onToggleTodo(toDo) {
        setIsToDoLoading((isToDoLoading) => [...isToDoLoading, toDo.id]);
        try {
            await axios.put(`http://localhost:4000/api/todos/${user.id}/${toDo.id}`, {
                name: toDo.name,
                isDone: !toDo.isDone,
                category: toDo.category,
            });
            getToDos();
            setIsToDoLoading((isToDoLoading) => isToDoLoading.filter((id) => id !== toDo.id));
        } catch (error) {
            /* eslint-disable-next-line no-console */
            console.error(error);
        }
        setIsLoading(false);
    }

    const onToggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };
    const getColorFromCategoryId = (categoryId) => {
        if (!categoryId) {
            return "col-0";
        }
        const selectedCategory = categories.find((category) => category.id === categoryId);

        return selectedCategory.color;
    };
    return (
        <div className="home">
            {!isFormOpen && (
                <div>
                    <button
                        className="round"
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleForm();
                        }}
                    >
                        <span>
                            <PlusIcon />
                        </span>
                    </button>
                </div>
            )}
            <ul>
                {toDos.length > 0 &&
                    toDos.map((toDo, index) => (
                        <li
                            key={index}
                            onClick={() => onToggleTodo(toDo)}
                        >
                            <div className="todoo">
                                <div className={`bolletje ${getColorFromCategoryId(toDo.category)}`}>
                                    {isToDoLoading.includes(toDo.id) && <Spinner />}
                                </div>
                                <p className={`todoname ${toDo.isDone ? "done" : ""}`}>{toDo.name}</p>
                            </div>
                        </li>
                    ))}
            </ul>
            {isFormOpen && (
                <form>
                    <div className="input-container">
                        <label> description </label>
                        <input
                            placeholder="to do"
                            type="text"
                            id="desc"
                            disabled={isLoading}
                            onChange={(e) => {
                                e.preventDefault();
                                setToDoName(e.target.value);
                            }}
                        />
                        {error.toDoName && <p className="error">{error.toDoName}</p>}
                    </div>

                    <div className="input-container">
                        <label> category </label>
                        <select
                            disabled={isLoading}
                            name="category"
                            id="category-select"
                            onChange={(e) => {
                                setToDoCategory(e.target.value);
                            }}
                        >
                            <option value={""}>make a choice</option>
                            {categories.map((category, index) => (
                                <option
                                    key={index}
                                    value={category.id}
                                >
                                    {category.desc}
                                </option>
                            ))}
                        </select>
                        {error.toDoCategory && <p className="error">{error.toDoCategory}</p>}
                        <div>
                            <button
                                className="primary"
                                disabled={isLoading}
                                type="submit"
                                onClick={(e) => onAddToDo(e)}
                            >
                                {isLoading ? <Spinner /> : "add"}
                            </button>
                            {errors.api && <Error />}
                        </div>
                    </div>
                </form>
            )}
            <div ref={bottomRef}></div>
        </div>
    );
}

export default Home;
