import React from "react";
import {shortDescription} from "../Helpers/Str";
import { Remarkable } from 'remarkable';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

export default function Article(props) {

    const md = new Remarkable({
        html: true
    });

    return (
        <div className={`max-w-md`}>
            <div className={`text-lg text-grey-darker leading-normal`}>
                <h1>Articles</h1>
                <p>Writing articles is a great way to share my knowledge with people who need it.<br/>Here are some popular ones.</p>
                <div className={`mt-12`}>
                    {
                        props.articles.map((article) => (
                            <div key={article.id} className={`mb-6`}>
                                <NavLink to={'/article/'+article.slug} className={`text-lg text-black font-bold no-underline hover:underline`}>{article.title}</NavLink>
                                <div className={`mt-1`} dangerouslySetInnerHTML={{ __html: md.render(shortDescription(article.content, 30)).replace(/<(?:.|\n)*?>/gm, '') }} />
                                <div className={`text-grey-darkest text-base leading-normal mt-3 mb-6`}>
                                    <NavLink to={'/article/'+article.slug} className={`text-grey-darker hover:text-black no-underline hover:underline`}>Read this article →</NavLink>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

Article.propTypes = {
    articles: PropTypes.array.isRequired
};
