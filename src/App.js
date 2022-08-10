import React from "react";
import { userContext } from "./context";
import { Menu } from "./components";
import Router from "./Router";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <userContext.Provider
                    value={{ user: "hello from the usercontext" }}
                >
                    <Menu />
                    <Router />
                </userContext.Provider>
            </div>
        );
    }
}
export default App;
