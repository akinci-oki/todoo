import React from "react";
import "./App.scss";
import { Menu } from "./components";
import Router from "./Router";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Menu />
                <Router />
            </div>
        );
    }
}
export default App;
