import React from 'react';
import Remarkable from "remarkable";
import hljs from "highlight.js";
import 'highlight.js/styles/darcula.css'
import PropTypes from "prop-types";

export default function ArticleShow(props) {

    const slug = props.match.params.slug;
    const articles = JSON.parse(localStorage.getItem('articles'));

    const article = articles.find((element) => {
        return element['slug'] === (slug);
    });

    const md = new Remarkable({
        html: true,
        langPrefix: 'hljs language-',
        langDefault: 'php',
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (err) {
                    console.log(err);
                }
            }

            try {
                return hljs.highlightAuto(str).value;
            } catch (err) {
                console.log(err);
            }

            return ''; // use external default escaping
        }
    });

    const content = article === undefined ? <h1>Article not found</h1> :
        <div className={`text-lg leading-normal text-grey-darker article`} dangerouslySetInnerHTML={{ __html: md.render(article.content) }} />;

    return (
        <div>
            <div className={`text-lg text-grey-darker leading-normal`}>
                {content}
            </div>
        </div>
    );
}

ArticleShow.propTypes = {
    match: PropTypes.object.isRequired
};