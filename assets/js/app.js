import React from "react";
import { HashRouter, Route } from "react-router-dom";
import {render} from "react-dom";
import "../css/app.scss";
import Header from "./App/Header";
import Home from "./App/Home";
import Article from "./App/Article";
import HireMe from "./App/HireMe";
import Project from "./App/Project";

render(
    <HashRouter>
        <div>
            <div className={`h-4 w-full bg-green`} />
            <div className={`container`}>
                <div className={`pt-16 pb-8 px-6 md:px-32 xl:px-64`}>
                    <Header />

                    <Route exact path="/" component={Home} />
                    <Route path="/projects" component={Project} />
                    <Route path="/articles" component={Article} />
                    <Route path="/hire-me" component={HireMe} />
                </div>
            </div>
        </div>
    </HashRouter>,
    document.getElementById("app")
);

