import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotFound, Menu } from "./components";
import { Homepage, Settingspage, Laundry, Profile } from "./pages";
import "./App.scss";

const Router = () => (
    <BrowserRouter>
        <div>
            <Menu />
            <Routes>
                <Route exact path="/" element={<Homepage />}></Route>
                <Route path="/settings" element={<Settingspage />}></Route>
                <Route path="/laundry" element={<Laundry />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
            </Routes>
        </div>
    </BrowserRouter>
);
export default Router;
