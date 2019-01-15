import React from "react";
import {shortDescription} from "../Helpers/Str";
import Remarkable from "remarkable";

export default function Article(props) {

    const md = new Remarkable({
        html: true
    });

    return (
        <div className={`w-full lg:w-3/4`}>
            <div className={`text-lg text-grey-darker leading-normal`}>
                <h1 className="text-2xl font-semibold text-black mb-4">
                    Articles
                </h1>
                <p className={`mb-6`}>Writing articles is a great way to share my knowledge with people who need it.</p>
                <p className={`mb-6`}>Here are some popular ones.</p>
                {
                    props.articles.map((article) => (
                        <div key={article.id} className={`mb-6`}>
                            <a href="https://github.com/liweiyi88/julianli" className={`text-lg text-black font-bold no-underline hover:underline`}>{article.title}</a>
                            <div className={`mt-1`} dangerouslySetInnerHTML={{ __html: md.render(shortDescription(article.content, 30)).replace(/<(?:.|\n)*?>/gm, '') }} />
                            <div className={`text-grey-darkest text-base leading-normal mt-2 mb-6`}>
                                <a href="https://github.com/liweiyi88/julianli" className="text-grey-darker hover:text-black no-underline hover:underline">Read this article →</a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>


    );
}
