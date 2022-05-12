import React from "react";
import "./App.scss";
import { Router } from "./Router";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router />
                {/* <CategoryForm categories={this.state.categories} /> */}
            </div>
        );
    }
}
export default App;
