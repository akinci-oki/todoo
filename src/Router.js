import React from "react";
import { Routes, Route } from "react-router-dom";

import { NotFound, SignUp, Login } from "./components";
import { Homepage, Settingspage, ProfilePage } from "./pages";
import "./App.scss";

const Router = () => (
    <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route path="/log-in" element={<Login />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/settings" element={<Settingspage />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
    </Routes>
);
export default Router;
