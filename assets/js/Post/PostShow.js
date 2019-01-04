import React, {Component} from 'react';
import {getPost} from "../Api/api";
import Loader from "../UtilComponent/Loader";
import Remarkable from 'remarkable';
import hljs from 'highlight.js';
import Logo from '../../images/logo.png';
import PropTypes from 'prop-types';
import Route from "../Constants/Route";

export default class PostShow extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            title: '',
            slug: '',
            content: '',
            author: '',
            tags: [],
            createdAt: ''
        };
    }

    componentDidMount() {
        getPost(this.props.id)
            .then((data) => {
                this.setState({
                    isLoading: false,
                    id: data['id'],
                    title: data['title'],
                    slug: data['slug'],
                    content: data['content'],
                    isPublished: data['isPublished'],
                    isPublic: data['isPublic'],
                    author: data.freelancer,
                    tags: data.tags,
                    createdAt: data['createdAt']
                })
            });
    }

    render() {
        const md = new Remarkable({
            html: true,
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

        const {createdAt, title, content, author, tags} = this.state;

        return (
            <div className={`mx-auto w-740 px-5`}>
                <div className={`flex items-center mt-10 mb-4 justify-center md:flex md:items-center mb-6`}>
                    {this.state.isLoading ? (<div>{<Loader/>}</div>) : (
                        <div className={`w-full`}>
                            <div className={`flex items-center mr-4`}>
                                <a href={Route.home}>
                                    <img src={Logo} alt="Logo"/>
                                </a>
                            </div>
                            <div className={`flex text-3xl font-bold my-3`}>
                                <div>{title}</div>
                                <div>
                                    {tags.map(tag => (
                                        <span key={tag.id} className={`label`}>{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={`text-base font-base italic text-grey mb-6`}>
                                by {author['firstName']} {author['lastName']} on {createdAt}
                            </div>
                            <div>
                                <div className={`text-lg leading-normal text-grey-darker`} dangerouslySetInnerHTML={{ __html: md.render(content) }} />
                            </div>
                        </div>
                        )}
                </div>
            </div>
        )
    }
}

PostShow.propTypes = {
    id: PropTypes.string.isRequired
};
