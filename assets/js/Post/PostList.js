import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import {shortDescription} from '../Utils/Str'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'

export default class PostList extends Component{

    constructor(props) {
        super(props);

        this.menuRefs = [];

        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        this.state = {
            editIconX: 0,
            editIconY: 0
        };
    }

    UNSAFE_componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    handleDeleteClick(event, postId) {
        const alert = withReactContent(Swal);

        alert.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value === true) {

                this.props.onDeletePost(postId);

                const message = alert.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000
                });

                message({
                    type: 'success',
                    title: 'Delete Successfully'
                }).then();
            }
        })
    }

    handleClick(e) {
        let inside = false;

        this.menuRefs.forEach((value, postId) => {
            if (value !== null && value.contains(e.target)) {

                this.props.onEditMenuClick(postId);

                let nodeCoor = value.getBoundingClientRect();

                let editIconY =  window.scrollY + nodeCoor.y - 96;
                if (window.innerHeight - nodeCoor.y > 96) {
                    editIconY = window.scrollY + nodeCoor.y + 21;
                }

                this.setState({
                    editIconX: nodeCoor.x - 38,
                    editIconY: editIconY
                });

                inside = true;
            }
        });

        if (inside === false) {
            this.props.onEditMenuClick(null);
        }
    }

    render () {
        const { editingMenuId, posts, onPublishToggleClick, onPublicToggleClick } = this.props;

        const transformCss = {
            transform: 'translate('+this.state.editIconX+'px, '+this.state.editIconY+'px)',
            willChange: 'transform'
        };

        return (
            posts.map((post) => (
                <div className={`flex-col mt-4 border-b`} key={post.id}>
                    <div className={`text-2xl font-bold`}>{post.title}</div>
                    <div className={`text-grey-darker text-lg mt-4 leading-normal`}>{shortDescription(post.content, 30)}</div>

                    <div className={`flex mt-4 mb-4 text-grey-dark text-base`}>
                        <div className={`pr-3`}>Created on {post.createdAt}</div>
                        {post.published ? (
                            <div className={`pr-2 transition`}>
                                <span className={`mr-1 text-green`}>Published</span>
                                <span onClick={(event) => onPublishToggleClick(event, post.id)} className={`text-green cursor-pointer`}><FontAwesomeIcon icon={faToggleOn} size="lg"/></span>
                            </div>
                        ) : (
                            <div className={`pr-2 text-red-light transition`}>
                                <span>Draft</span>
                                <span onClick={(event) => onPublishToggleClick(event, post.id)} className={`pl-1 cursor-pointer`}><FontAwesomeIcon icon={faToggleOff} size="lg"/></span>
                            </div>
                        )}
                        {post.public ? (
                            <div className={`pr-2 text-green transition`}>Public
                                <span onClick={(event) => onPublicToggleClick(event, post.id)} className={`pl-1 cursor-pointer`}><FontAwesomeIcon icon={faToggleOn} size="lg"/></span>
                            </div>
                        ) : (
                            <div className={`pr-2 text-orange-light transition`}>Private
                                <span onClick={(event) => onPublicToggleClick(event, post.id)} className={`pl-1 cursor-pointer`}><FontAwesomeIcon icon={faToggleOff} size="lg"/></span>
                            </div>
                        )}
                        <div className={`cursor-pointer`} ref={(ref) => {this.menuRefs[post.id] = ref}}>
                            <svg width="21" pointerEvents="none" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                <path pointerEvents="none" d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z"></path>
                            </svg>
                            {editingMenuId === post.id &&
                                <div className={`menu`}
                                     style={transformCss}
                                >
                                    <ul className={`list-reset`}>
                                        <li className={`pt-4 hover:text-black`}>Edit post</li>
                                        <li onClick={(event) => this.handleDeleteClick(event, post.id)} className={`pt-4 hover:text-black`}>Delete post</li>
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

PostList.propTypes = {
    editingMenuId: PropTypes.number,
    posts: PropTypes.array.isRequired,
    onEditMenuClick: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    onPublishToggleClick: PropTypes.func.isRequired,
    onPublicToggleClick: PropTypes.func.isRequired
};