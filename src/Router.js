import React from "react";
import { Routes, Route } from "react-router-dom";

import { NotFound } from "./components";
import { Homepage, Settingspage, Profile } from "./pages";
import "./App.scss";

const Router = () => (
    <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route path="/settings" element={<Settingspage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
    </Routes>
);
export default Router;
