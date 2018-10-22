import React from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import PropTypes from 'prop-types';

export default function Posts(props) {

    const {editingPost, posts, onEditPost, onCancelPost, onDeletePost} = props;

    return (
        <div>
            <h1>My posts</h1>

            { posts.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Is published</th>
                        <th>Is public</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <PostList
                        posts={posts}
                        onEditPost={onEditPost}
                        onDeletePost={onDeletePost}
                    />
                </table>) : (
                    <h2>You have not written any post yet.</h2>
                )
            }

            <div>
                <button>New story</button>
            </div>

            <br/>
            <br/>

            <PostForm editingPost={editingPost} onCancelPost={onCancelPost}/>
        </div>
    )
}

Posts.propTypes = {
    editingPost: PropTypes.object,
    posts: PropTypes.array.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onCancelPost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired
};


