import React from "react";
import "./App.scss";
import { Home, Menu, Settings } from "./components";

class App extends React.Component {
    state = {
        isMenuOpen: false,
        categories: [
            {
                id: "cat-01",
                desc: "personal",
                color: "col-1",
            },
            {
                id: "cat-02",
                desc: "professional",
                color: "col-2",
            },
            {
                id: "cat-03",
                desc: "kids",
                color: "col-3",
            },
        ],
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
                {/*  <Home /> */}
                <Settings categories={this.state.categories} />
            </div>
        );
    }
}
export default App;
