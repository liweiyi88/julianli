import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Posts from "./Posts";
import ReactDOM from "react-dom";

export default class PostList extends Component{

    constructor(props) {
        super(props);

        this.shortDescription = this.shortDescription.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            editIconX: 0,
            editIconY: 0
        };
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    shortDescription(content) {
        let output = content.trim().split(' ');

        if (output.length > 30) {
            return output.slice(0, 30).join(' ') + '...';
        }

        return output.slice(0, 30).join(' ') + '...';
    }

    handleClick(e) {
        console.log(e.target);

        var postId = null;
        if (e.target.attributes.getNamedItem('data-value') !== null) {
             postId = e.target.attributes.getNamedItem('data-value').value;
        }

        if (postId !== undefined && postId !== null) {

            this.props.onEditMenuClick(postId);

            let nodeCoor = ReactDOM
                .findDOMNode(e.target)
                .getBoundingClientRect();


            let editIconY = window.innerHeight - nodeCoor.y < 96 ? nodeCoor.y - 96 : nodeCoor.y + 96/2 - 20;

            this.setState({
                editIconX: nodeCoor.x - 96 / 2 + 12,
                editIconY: editIconY
            })
            return;
        }

        this.props.onEditMenuClick(null);
    };

    render () {
        const {editingMenuId, clickPosition, posts, onEditPost, onDeletePost, } = this.props;

        const ctrans = 'translate('+this.state.editIconX+'px, '+this.state.editIconY+'px)';
        const css = {
            transform: ctrans,
            willChange: 'transform'
        };

        return (
            posts.map((post) => (
                <div className={`flex-col mt-4 border-b`} key={post.id}>
                    <div className={`text-2xl font-bold`}>{post.title}</div>
                    <div className={`text-grey-darker text-lg mt-4 leading-normal`}>{this.shortDescription(post.content)}</div>

                    <div className={`flex mt-4 mb-4 text-grey-dark text-base`}>
                        <div className={`pr-2`}>{post.published ? 'Published' : 'Draft' }</div> <div>{post.public ? 'Public' : 'Private' }</div>
                        <div className={`cursor-pointer`}>
                            <svg data-value={post.id} width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><path d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z"></path></svg>
                            {editingMenuId == post.id &&
                                <div className={`absolute pin w-24 h-24 pl-3 pt-2 pb-2 pr-2 rounded shadow border text-sm bg-white`}
                                     style={css}
                                >
                                    <ul className={`list-reset`}>
                                        <li className={`pt-4`}>Edit post</li>
                                        <li className={`pt-4`}>Delete post</li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ))
        )
    }
}

Posts.propTypes = {
    clickPosition: PropTypes.object,
    posts: PropTypes.array.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
};