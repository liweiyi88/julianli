import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {shortDescription} from '../Utils/Str'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'
import Toggle from './Toggle'
import Remarkable from 'remarkable';

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

    getSnapshotBeforeUpdate() {
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

                this.props.onDeletePost(postId)
                    .then(() => {
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
                );
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

        const md = new Remarkable({
            html: true
        });

        return (
            posts.map((post) => (
                <div className={post.isDeleting ? `flex-col mt-4 border-b opacity-50` : `flex-col mt-4 border-b`} key={post.id}>
                    <div className={`flex items-center`}>
                        <a className={`no-underline text-black text-xl font-bold cursor-pointer`} href={`/admin/posts/`+post.id+`/show`}>{post.title}</a>
                        <div>
                            {post.tags.map(tag => (
                                <span key={tag.id} className={`label`}>{tag.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className={`text-grey-darker text-lg mt-4 leading-normal`}>
                        <div dangerouslySetInnerHTML={{ __html: md.render(shortDescription(post.content, 30)).replace(/<(?:.|\n)*?>/gm, '') }} />
                    </div>

                    <div className={`flex mt-4 mb-4 text-grey-dark text-base`}>
                        <div className={`pr-3`}>Created on {post.createdAt}</div>
                        <div className={`pr-2 transition w-20`}>
                            <Toggle
                                toggle={post.isPublished}
                                toggleOnText={`Published`}
                                toggleOnTextColor={`text-green`}
                                toggleOffText={`Draft`}
                                toggleOffTextColor={`text-red-light`}
                                onToggleClick={(event) => onPublishToggleClick(event, post.id)}
                            />
                        </div>

                        <div className={`pr-2 transition w-20`}>
                            <Toggle
                                toggle={post.isPublic}
                                toggleOnText={`Public`}
                                toggleOnTextColor={`text-green`}
                                toggleOffText={`Private`}
                                toggleOffTextColor={`text-orange-light`}
                                onToggleClick={(event) => onPublicToggleClick(event, post.id)}
                            />
                        </div>

                        <div className={`cursor-pointer`} ref={(ref) => {this.menuRefs[post.id] = ref}}>
                            <svg width="21" pointerEvents="none" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                <path pointerEvents="none" d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z"/>
                            </svg>
                            {editingMenuId === post.id &&
                                <div className={`menu`}
                                     style={transformCss}
                                >
                                    <ul className={`list-reset`}>
                                        <li onClick={() => {window.location.href = '/admin/posts/'+post.id+'/edit'}} className={`pt-4 hover:text-black`}>Edit post</li>
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