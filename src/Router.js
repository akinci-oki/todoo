import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { NotFound } from "./components";
import { Homepage, Settingspage } from "./pages";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/settings" element={<Settingspage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
