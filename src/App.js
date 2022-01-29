import React from "react";
import "./App.scss";
import { Home, Menu } from "./components";

class App extends React.Component {
    state = {
        isMenuOpen: false,
    };

    onToggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    };

    render() {
        return (
            <div className="App">
                <Menu
                    isMenuOpen={this.state.isMenuOpen}
                    onToggleMenu={this.onToggleMenu}
                />
                <Home />
            </div>
        );
    }
}
export default App;
