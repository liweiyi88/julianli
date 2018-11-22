import React from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import PropTypes from 'prop-types';

export default function Posts(props) {

    const {
        clickPosition,
        editingPost,
        editingMenuId,
        posts,
        onEditPost,
        onEditMenuClick,
        onCancelPost,
        onDeletePost,
        onClickPosition
    } = props;

    return (
        <div className={`container mx-auto w-3/4`}>
            <div className={`flex items-center mt-10 mb-4 justify-between`}>
                <div className={`text-4xl font-bold`}>My posts</div>

                <div>
                    <button className={`btn btn-green`}>New story</button>
                </div>
            </div>

            <div className={`flex flex-col`}>
            { posts.length > 0 ? (
                    <PostList
                        clickPosition={clickPosition}
                        posts={posts}
                        onEditPost={onEditPost}
                        onEditMenuClick={onEditMenuClick}
                        onDeletePost={onDeletePost}
                        onClickPosition={onClickPosition}
                        editingMenuId={editingMenuId}
                    />
            ) : (
                    <h2>You have not written any post yet.</h2>
                )
            }
            </div>

            <br/>
            <br/>

            <PostForm editingPost={editingPost} onCancelPost={onCancelPost}/>
        </div>
    )
}

Posts.propTypes = {
    clickPosition: PropTypes.object,
    editingPost: PropTypes.object,
    posts: PropTypes.array.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onEditMenuClick: PropTypes.func.isRequired,
    onCancelPost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    onClickPosition: PropTypes.func.isRequired
};


