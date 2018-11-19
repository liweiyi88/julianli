import React from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import PropTypes from 'prop-types';

export default function Posts(props) {

    const {editingPost, posts, onEditPost, onCancelPost, onDeletePost} = props;

    return (
        <div className={`container mx-auto`}>
            <h1 className={`mt-10 mb-4 flex justify-center`}>My posts</h1>

            <div className={`flex justify-center`}>
            { posts.length > 0 ? (
                <div className={`table-auto table border-solid`}>
                    <div className={`table-row mt-4`}>
                        <div className={`table-cell p-2`}>Title</div>
                        <div className={`table-cell p-2`}>Slug</div>
                        <div className={`table-cell p-2`}>Is published</div>
                        <div className={`table-cell p-2`}>Is public</div>
                        <div className={`table-cell p-2`}>Actions</div>
                    </div>
                    <PostList
                        posts={posts}
                        onEditPost={onEditPost}
                        onDeletePost={onDeletePost}
                    />
                </div>) : (
                    <h2>You have not written any post yet.</h2>
                )
            }
            </div>

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


