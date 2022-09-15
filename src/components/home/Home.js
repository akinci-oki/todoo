import "../../App.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context";
import axios from "axios";
import { categories } from "../../categories";
import { Spinner, Error } from "../../components";
import { ReactComponent as PlusIcon } from "../../icons/plus-icon.svg";

function Home() {
    const { user } = useUser();
    const bottomRef = useRef(null);
    const navigate = useNavigate();
    const [toDoName, setToDoName] = useState("");
    const [toDoCategory, setToDoCategory] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isToDoLoading, setIsToDoLoading] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [desc, setDesc] = useState([]);
    const [toDosPerList, setToDosPerList] = useState();
    const [toDos, setToDos] = useState([]);
    const [error, setError] = useState({
        toDoName: null,
        toDoCategory: null,
        api: null,
    });

    useEffect(() => {
        if (!user.id) {
            navigate("/profile");
        }
    });

    useEffect(() => {
        getTodosPerList();
    }, [user]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [isFormOpen]);

    const getCategoryDesc = (id) => {
        const myCategory = categories.find((category) => category.id === id);
        return myCategory.desc;
    };

    async function getTodosPerList() {
        if (!user.id) return;
        try {
            const response = await axios.get(`http://localhost:4000/api/todos/${user.id}/per-list`);
            setToDosPerList(response.data);

            const cardLabels = Object.keys(response.data);
            const myCardLabels = cardLabels.map((cardLabel) => getCategoryDesc(cardLabel));
            setDesc(myCardLabels);

            const toDos = Object.values(response.data).flat();
            setToDos(toDos);
        } catch (error) {
            /* eslint-disable-next-line no-console */
            console.error(error);
        }
    }

    async function onAddToDo(e) {
        setError({
            toDoCategory: null,
            toDoName: null,
        });
        e.preventDefault();
        if (toDoName.length < 1) {
            setError({
                toDoName: "please fill in a description.",
            });
        } else if (toDoCategory === "" || toDoCategory === null) {
            setError({
                toDoCategory: "please pick a category.",
            });
        }
        if (toDoName.length < 1 || toDoCategory === "" || toDoCategory === null) {
            return;
        }
        setIsLoading(true);

        try {
            await axios.post(`http://localhost:4000/api/todos/${user.id}`, {
                name: toDoName,
                isDone: false,
                category: toDoCategory,
            });
            getTodosPerList();
        } catch (error) {
            setError(() => ({
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
            getTodosPerList();
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

            {desc.length > 0 && (
                <div className="row">
                    {desc.map((desc, index) => (
                        <div
                            key={index}
                            className="card"
                        >
                            <p>{desc}</p>
                        </div>
                    ))}
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
                            name="category"
                            disabled={isLoading}
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
                            {error.api && <Error />}
                        </div>
                    </div>
                </form>
            )}
            <div ref={bottomRef}></div>
        </div>
    );
}

export default Home;
