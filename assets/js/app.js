import React from "react";
import {render} from "react-dom";
import App from './App/App';
import "../css/app.scss";
import Home from "./App/Home";

render(
    <App><Home /> </App>,
    document.getElementById("app")
);

