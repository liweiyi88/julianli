import React from 'react';
import PropTypes from 'prop-types';
import Posts from "./Posts";

export default function PostList(props) {

    const {posts, onEditPost, onDeletePost} = props;

    return (
        posts.map((post) => (
            <div className={`table-row`} key={post.id}>
                <div className={`table-cell p-2`}>{post.title}</div>
                <div className={`table-cell p-2`}>{post.slug}</div>
                <div className={`table-cell p-2`}>{post.published ? 'Published' : 'Draft' }</div>
                <div className={`table-cell p-2`}>{post.public ? 'Public' : 'Private' }</div>
                <div className={`table-cell p-2`}>
                    <button className={`btn btn-blue`} onClick={() => onEditPost(post)}>edit</button>
                    <button className={`btn btn-red ml-2`} onClick={() => onDeletePost(post.id)}>delete</button>
                </div>
            </div>
        ))
    )
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired
};