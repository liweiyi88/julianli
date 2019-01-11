import React from 'react';
import {render} from "react-dom";
import '../css/app.scss';
import Header from "./App/Header";
import Footer from "./App/Footer";

render(
    <div>
        <div className={`h-4 w-full bg-green`} />
        <div className={`container`}>
            <div className={`pt-24 pb-8 px-6 lg:px-64`}>
                <Header />

                <div className={`mt-12 max-w-md`}>
                    <h1 className={`text-2xl font-semibold text-black mb-4`}>
                        Who am I?
                    </h1>
                    <div className={`text-lg text-grey-darker leading-normal spaced-y-6`}>
                        <p className={`mb-6`}>I'm Julian Li, a full-stack developer, I live in Melbourne with my wife and daughter.</p>
                        <p className={`mb-6`}>I am experienced in developing complex web application with/without any PHP framework, equipped with cross-industry domain knowledge.</p>
                        <p className={`mb-6`}><a href="https://reactjs.org/" target={`_blank`} className={`text-green`}>React</a> and <a href="https://tailwindcss.com/" target={`blank`} className={`text-green`}>Tailwind CSS</a> are my favourite tools for front-end development.</p>
                        <p>Right now, I am following recommendation from <a href="https://refactoringui.com/book/" target={`blank`} className={`text-green`}>Refactoring UI to improve my design skill.</a></p>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    </div>,
    document.getElementById('app')
);

