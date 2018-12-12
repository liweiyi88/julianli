import React from 'react';
import PostList from './PostList';
import PropTypes from 'prop-types';

export default function Posts(props) {

    const {
        editingMenuId,
        posts,
        isLoading,
        onEditMenuClick,
        onDeletePost,
        onPublishToggleClick,
        onPublicToggleClick,
        onNewPostClick
    } = props;

    return (
        <div className={`container mx-auto w-3/4`}>
            <div className={`flex items-center mt-10 mb-4 justify-between`}>
                <div className={`text-4xl font-bold`}>My posts</div>

                <div>
                    <button className={`btn btn-green hover:bg-green-dark`} onClick={onNewPostClick}>New story</button>
                </div>
            </div>

            <div className={`flex flex-col`}>
                {isLoading ?  (
                    <div className={`mt-5`}>{props.loader}</div>
                ) :  <PostList
                    posts={posts}
                    onEditMenuClick={onEditMenuClick}
                    editingMenuId={editingMenuId}
                    onDeletePost={onDeletePost}
                    onPublishToggleClick={onPublishToggleClick}
                    onPublicToggleClick={onPublicToggleClick}
                />}
            </div>
        </div>
    )
}

Posts.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    editingMenuId: PropTypes.number,
    onEditMenuClick: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    onPublishToggleClick: PropTypes.func.isRequired,
    onPublicToggleClick: PropTypes.func.isRequired,
    onNewPostClick: PropTypes.func.isRequired,
    loader: PropTypes.any
};


