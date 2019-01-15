import React from "react";

export default function Project() {
    return (
        <div className={`w-full lg:w-3/4`}>
            <div className={`text-lg text-grey-darker leading-normal`}>
                <h1 className="text-2xl font-semibold text-black mb-4">
                    Open Projects
                </h1>
                <p className={`mb-6`}>Over the past few years, I have been employed to work on private projects and I was frustrated that I could not show my ability to the public.</p>
                <p className={`mb-6`}>Then, I decided to create open source projects to show what I can do, share what I have learnt and plan what I should do.</p>

                <a href="https://github.com/liweiyi88/julianli" className={`text-lg text-black font-bold no-underline hover:underline`}>My personal website &quot;julianli&quot;</a>
                <p className={`mt-1`}>I am consistently working on the project to keep myself motivated. I learn new things, share what I have learnt to people who need it. Technically, it includes a lot of examples that can be used in modern web development.</p>
                <div className={`text-grey-darkest text-base leading-normal mt-2 mb-6`}>
                    <a href="https://github.com/liweiyi88/julianli" className="text-grey-darker hover:text-black no-underline hover:underline">Checkout the source code →</a>
                </div>

                <a href="http://monash.edu/research/city-science/pedsafety/" className={`text-lg text-black font-bold no-underline hover:underline`}>Melbourne Pedestrian Activities and Safety (GovHack 2015)</a>
                <p className={`mt-1`}>I teamed up with firends on Govhack 2015 competition. We created a data visualization to provide some insights into the spatial and temporal distribution of pedestrian activities and crashes in Melbourne.</p>
                <div className={`text-grey-darkest text-base leading-normal mt-2 mb-6`}>
                    <a href="http://monash.edu/research/city-science/pedsafety/" className="text-grey-darker hover:text-black no-underline hover:underline">Visit the website →</a>
                </div>
            </div>
        </div>
    );
}
