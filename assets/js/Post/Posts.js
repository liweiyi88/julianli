import React from 'react';
import PostList from './PostList';
import PropTypes from 'prop-types';

export default function Posts(props) {

    const {
        editingMenuId,
        posts,
        onEditMenuClick,
        onDeletePost,
        onPublishToggleClick,
        onPublicToggleClick
    } = props;

    return (
        <div className={`container mx-auto w-3/4`}>
            <div className={`flex items-center mt-10 mb-4 justify-between`}>
                <div className={`text-4xl font-bold`}>My posts</div>

                <div>
                    <button className={`btn btn-green hover:bg-green-dark`}>New story</button>
                </div>
            </div>

            <div className={`flex flex-col`}>
            { posts.length > 0 ? (
                    <PostList
                        posts={posts}
                        onEditMenuClick={onEditMenuClick}
                        editingMenuId={editingMenuId}
                        onDeletePost={onDeletePost}
                        onPublishToggleClick={onPublishToggleClick}
                        onPublicToggleClick={onPublicToggleClick}
                    />
            ) : (
                    <h2>You have not written any post yet.</h2>
                )
            }
            </div>
        </div>
    )
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    editingMenuId: PropTypes.number,
    onEditMenuClick: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    onPublishToggleClick: PropTypes.func.isRequired,
    onPublicToggleClick: PropTypes.func.isRequired
};


