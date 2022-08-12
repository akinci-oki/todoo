import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { useUser } from "../../context";
import { Avatar } from "../../components";
import { ReactComponent as AccountIcon } from "../../icons/account-icon.svg";
import { ReactComponent as HamburgerIcon } from "../../icons/hamburger-icon.svg";
import { ReactComponent as SettingsIcon } from "../../icons/settings-icon.svg";
import { ReactComponent as StatisticsIcon } from "../../icons/statistics-icon.svg";

function Menu() {
    const { user } = useUser();

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
                    <span>
                        <Link className="label" to="/" onClick={onCloseMenu}>
                            ToDoobieDoompie
                        </Link>
                    </span>
                    {user.id && (
                        <span>
                            <Avatar />
                        </span>
                    )}
                </li>
                <li className="menu-item">
                    <span className="icon" onClick={onToggleMenu}>
                        <SettingsIcon />
                    </span>
                    <span>
                        <Link
                            className="label"
                            to="/settings"
                            onClick={onCloseMenu}
                        >
                            Categories
                        </Link>
                    </span>
                </li>
                <li className="menu-item">
                    <span className="icon" onClick={onToggleMenu}>
                        <StatisticsIcon />
                    </span>
                    <span>
                        <Link
                            className="label"
                            to="/statistics"
                            onClick={onCloseMenu}
                        >
                            Statistics
                        </Link>
                    </span>
                </li>
                <li className="menu-item">
                    <span className="icon" onClick={onToggleMenu}>
                        <AccountIcon />
                    </span>
                    <span>
                        <Link
                            className="label"
                            to="/profile"
                            onClick={onCloseMenu}
                        >
                            Profile
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
