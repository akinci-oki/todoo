import "../../App.scss";
import { useState } from "react";

function Home() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const onToggleForm = () => {
        setIsFormOpen(!isFormOpen);
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
                <li>
                    <div className="todoo">
                        <div className={`bolletje ${"col-1"}`} />
                        <p>pick up translations</p>
                    </div>
                </li>
                <li>
                    <div className="todoo">
                        <div className={`bolletje ${"col-3"}`} />
                        <p>pick up Elif</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Home;
