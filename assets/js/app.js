import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import {render} from "react-dom";
import '../css/app.scss';
import Header from "./App/Header";
import Footer from "./App/Footer";
import Home from "./App/Home";
import Article from "./App/Article";
import HireMe from "./App/HireMe";

render(
    <HashRouter>
        <div>
            <div className={`h-4 w-full bg-green`} />
            <div className={`container`}>
                <div className={`pt-24 pb-8 px-6 lg:px-64`}>
                    <Header />

                    <Route exact path="/preview" component={Home} />
                    <Route path="/articles" component={Article} />
                    <Route path="/hire-me" component={HireMe} />

                    <Footer />
                </div>
            </div>
        </div>
    </HashRouter>,
    document.getElementById('app')
);

