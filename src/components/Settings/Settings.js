import { ReactComponent as EditNameIcon } from "../../icons/edit-name-icon.svg";
import { ReactComponent as PickAColorIcon } from "../../icons/pick-a-color-icon.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
import PropTypes from "prop-types";

const Settings = ({ categories }) => {
    console.log(categories);
    return (
        <div className="settings">
            <h2> My categories </h2>
            <ul>
                {categories.map((category) => (
                    <li>
                        <div className="cat-label">
                            <div className={`bolletje ${category.color}`} />{" "}
                            {category.desc}
                        </div>
                        <span className="icon-container">
                            <span
                                className="icon"
                                onClick={() => console.log("edit")}
                            >
                                <EditNameIcon />
                            </span>
                            <span
                                className="icon"
                                onClick={() => console.log("color")}
                            >
                                <PickAColorIcon />
                            </span>
                            <span
                                className="icon"
                                onClick={() => console.log("delete")}
                            >
                                <DeleteIcon />
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

Settings.propTypes = {
    categories: PropTypes.object,
};

export default Settings;
