import React from "react";
import Footer from "./Footer";

export default function Home() {
    return (
        <div className={`max-w-md text-lg text-grey-darker leading-normal`}>
            <h1>
                Who am I?
            </h1>
            <div>
                <p>I am Julian Li, a full-stack developer, I live in Melbourne with my wife and daughter.</p>
                <p>I am experienced in developing complex web applications with/without any PHP framework, equipped with cross-industry domain knowledge.</p>
                <p><a href="https://reactjs.org/" target={`_blank`} className={`text-green`}>React</a> and <a href="https://tailwindcss.com/" target={`blank`} className={`text-green`}>Tailwind CSS</a> are my favourite tools for front-end development.</p>
                <p>Right now, I am following recommendations from <a href="https://refactoringui.com/book/" target={`blank`} className={`text-green`}>Refactoring UI</a> to enhance my design skill.</p>
            </div>
            <Footer />
        </div>
    );
}
