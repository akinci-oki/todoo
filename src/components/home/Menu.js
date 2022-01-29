import { ReactComponent as HamburgerIcon } from "../../icons/hamburger-icon.svg";
import { ReactComponent as SettingsIcon } from "../../icons/settings-icon.svg";
import { ReactComponent as StatisticsIcon } from "../../icons/statistics-icon.svg";
import { ReactComponent as AccountIcon } from "../../icons/account-icon.svg";
import PropTypes from "prop-types";

const Menu = (props) => {
    return (
        <div>
            <ul className={`menu ${props.isMenuOpen ? "menu-open" : ""}`}>
                <li className="page-title">
                    <span className="icon" onClick={() => props.onToggleMenu()}>
                        <HamburgerIcon />
                    </span>
                    <span className="label"> ToDoobieDoompie </span>
                </li>
                <li className="menu-item">
                    <span className="icon"> </span>
                    <span className="label"> Settings </span>
                </li>
                <li className="menu-item">
                    <span className="icon">X</span>
                    <span className="label"> Statistics </span>
                </li>
                <li className="menu-item">
                    <span className="icon">X</span>
                    <span className="label"> Profile </span>
                </li>
            </ul>
        </div>
    );
};

Menu.propTypes = {
    isMenuOpen: PropTypes.bool,
    onToggleMenu: PropTypes.func,
};

export default Menu;
