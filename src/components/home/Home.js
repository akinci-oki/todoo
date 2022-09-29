import "../../App.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context";
import axios from "axios";
import Cookies from "js-cookie";
import { lists } from "../../lists";
import { Spinner, Error, ProgressBar } from "../../components";
import { ReactComponent as PlusIcon } from "../../icons/plus-icon.svg";

function Home() {
    const { user } = useUser();
    const bottomRef = useRef(null);
    const navigate = useNavigate();
    const [toDoName, setToDoName] = useState("");
    const [toDoList, setToDoList] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isToDoLoading, setIsToDoLoading] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toDosPerList, setToDosPerList] = useState();
    const [isDeleteModeOn, setIsDeleteModeOn] = useState(false);
    const [toDos, setToDos] = useState([]);
    const [error, setError] = useState({
        toDoName: null,
        toDoList: null,
        api: null,
    });

    useEffect(() => {
        const UID = Cookies.get("UID");
        if (!UID) {
            navigate("/profile");
        }
    }, []);

    useEffect(() => {
        getTodosPerList();
    }, [user]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [isFormOpen]);

    const getTotalTodos = (list) => {
        return list.length;
    };
    const getCompletedTodos = (toDos) => {
        return toDos.filter((toDo) => toDo.isDone).length;
    };

    const getBackgroundColor = (id) => {
        return lists.find((list) => list.id === id).color;
    };

    const getListDesc = (id) => {
        return lists.find((list) => list.id === id).desc;
    };

    async function getTodosPerList() {
        if (!user.id) return;
        try {
            const response = await axios.get(`http://localhost:4000/api/todos/${user.id}/per-list`);
            setToDosPerList(Object.entries(response.data));

            const toDos = Object.values(response.data).flat();
            setToDos(toDos);
        } catch (error) {
            /* eslint-disable-next-line no-console */
            console.error(error);
        }
    }

    async function onAddToDo(e) {
        setError({
            toDoList: null,
            toDoName: null,
        });
        e.preventDefault();
        if (toDoName.length < 1) {
            setError((error) => ({
                ...error,
                toDoName: "please fill in a description.",
            }));
        }
        if (toDoList === "" || toDoList === null) {
            setError((error) => ({
                ...error,
                toDoList: "please pick a list.",
            }));
        }
        if (toDoName.length < 1 || toDoList === "" || toDoList === null) {
            return;
        }
        setIsLoading(true);

        try {
            await axios.post(`http://localhost:4000/api/todos/${user.id}`, {
                name: toDoName,
                isDone: false,
                list: toDoList,
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
                list: toDo.list,
            });
            getTodosPerList();
            setIsToDoLoading((isToDoLoading) => isToDoLoading.filter((id) => id !== toDo.id));
        } catch (error) {
            /* eslint-disable-next-line no-console */
            console.error(error);
        }
        setIsLoading(false);
    }
    async function onDeleteTodo(toDo) {
        setIsToDoLoading((isToDoLoading) => [...isToDoLoading, toDo.id]);
        try {
            await axios.delete(`http://localhost:4000/api/todos/${user.id}/${toDo.id}`);
            getTodosPerList();
        } catch (error) {
            setError(() => ({
                api: "something went wrong, please try again.",
            }));
            setIsToDoLoading((isToDoLoading) => isToDoLoading.filter((id) => id !== toDo.id));
            /* eslint-disable-next-line no-console */
            console.error(error);
        }
        setIsDeleteModeOn(false);
    }

    const onToggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };
    const getColorFromListId = (listId) => {
        if (!listId) {
            return "col-0";
        }
        const selectedList = lists.find((list) => list.id === listId);

        return selectedList.color;
    };
    return (
        <div className="home">
            {!isFormOpen && (
                <div>
                    <button
                        className="round"
                        type="button"
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

            {toDosPerList && toDosPerList.length > 0 && (
                <div className="row">
                    {toDosPerList.map(([key, value], index) => (
                        <div
                            key={index}
                            className="card"
                        >
                            <p>{getListDesc(key)}</p>
                            <ProgressBar
                                compeletedTodos={getCompletedTodos(value)}
                                totalTodos={getTotalTodos(value)}
                                backgroundColor={getBackgroundColor(key)}
                            />
                        </div>
                    ))}
                </div>
            )}

            <ul>
                <form className="row-link">
                    {/* <p className="link">edit todo</p> */}
                    <p
                        className={`link ${isDeleteModeOn ? "mode-on" : ""}`}
                        onClick={() => {
                            setIsDeleteModeOn(!isDeleteModeOn);
                        }}
                    >
                        delete todo
                    </p>
                </form>
                {error.api && <Error />}

                {toDos.length > 0 &&
                    toDos.map((toDo, index) => (
                        <li
                            key={index}
                            onClick={() => (isDeleteModeOn ? onDeleteTodo(toDo) : onToggleTodo(toDo))}
                        >
                            <div className="todoo">
                                <div className={`bolletje ${getColorFromListId(toDo.list)}`}>
                                    {isToDoLoading.includes(toDo.id) && <Spinner />}
                                </div>
                                <p
                                    className={`todoname ${toDo.isDone ? "done" : ""} ${
                                        isToDoLoading.includes(toDo.id) ? "includes" : ""
                                    } `}
                                >
                                    {toDo.name}
                                </p>
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
                        <label> list </label>
                        <select
                            name="list"
                            disabled={isLoading}
                            id="list-select"
                            onChange={(e) => {
                                setToDoList(e.target.value);
                            }}
                        >
                            <option value={""}>make a choice</option>
                            {lists.map((list, index) => (
                                <option
                                    key={index}
                                    value={list.id}
                                >
                                    {list.desc}
                                </option>
                            ))}
                        </select>
                        {error.toDoList && <p className="error">{error.toDoList}</p>}
                        <div>
                            <button
                                className="primary"
                                disabled={isLoading}
                                type="button"
                                onClick={(e) => onAddToDo(e)}
                            >
                                {isLoading ? <Spinner /> : "add"}
                            </button>
                            {error.api && <Error />}
                            <button
                                className="secondary"
                                type="button"
                                onClick={() => {
                                    setIsFormOpen(false);
                                }}
                            >
                                cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
            <div ref={bottomRef}></div>
        </div>
    );
}

export default Home;
