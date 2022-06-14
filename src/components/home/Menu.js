import { ReactComponent as HamburgerIcon } from "../../icons/hamburger-icon.svg";
import { ReactComponent as SettingsIcon } from "../../icons/settings-icon.svg";
import { ReactComponent as StatisticsIcon } from "../../icons/statistics-icon.svg";
import { ReactComponent as AccountIcon } from "../../icons/account-icon.svg";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const onCloseMenu = () => {
        setIsMenuOpen(false);
    };
    return (
        <div>
            <ul className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
                <li className="page-title">
                    <span className="icon" onClick={onToggleMenu}>
                        <HamburgerIcon />
                    </span>
                    <span className="label">
                        <Link to="/" onClick={onCloseMenu}>
                            ToDoobieDoompie
                        </Link>
                    </span>
                </li>
                <li className="menu-item">
                    <span className="icon" onClick={onToggleMenu}>
                        <SettingsIcon />
                    </span>
                    <span className="label">
                        <Link to="/settings" onClick={onCloseMenu}>
                            Settings
                        </Link>
                    </span>
                </li>
                <li className="menu-item">
                    <span className="icon" onClick={onToggleMenu}>
                        <StatisticsIcon />
                    </span>
                    <span className="label"> Statistics </span>
                </li>
                <li className="menu-item">
                    <span className="icon" onClick={onToggleMenu}>
                        <AccountIcon />
                    </span>
                    <span className="label">
                        <Link to="/profile" onClick={onCloseMenu}>
                            Profile
                        </Link>
                    </span>
                </li>
                <li className="menu-item">
                    <span className="icon" onClick={onToggleMenu}>
                        <AccountIcon />
                    </span>
                </li>
                <li className="menu-item">
                    <span className="icon" onClick={onToggleMenu}>
                        <StatisticsIcon />
                    </span>
                    <span className="label">
                        <Link to="/api" onClick={onCloseMenu}>
                            api
                        </Link>
                    </span>
                </li>
            </ul>
        </div>
    );
}

Menu.propTypes = {
    isMenuOpen: PropTypes.bool,
    onToggleMenu: PropTypes.func,
};

export default Menu;
