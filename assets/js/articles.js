import React from "react";
import {render} from "react-dom";
import "../css/app.scss";
import Article from "./App/Article";
import App from "./App/App";

render(
    <App><Article articles={[]}/></App>,
    document.getElementById("articles")
);

