import React from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import PropTypes from 'prop-types';

export default function Posts(props) {

    const {editingPost, posts, onEditPost, onCancelPost, onDeletePost} = props;

    return (
        <div className={`container mx-auto`}>
            <h1 className={`mt-10 mb-4 flex justify-center`}>My posts</h1>

            <div className={`flex mt-4 flex-row-reverse`}>
                <button className={`btn btn-green`}>New story</button>
            </div>

            <div className={`flex justify-center`}>
            { posts.length > 0 ? (
                <div className={`flex flex-col border-collapse w-full justify-center`}>
                    <div className={`flex mt-4 bg-grey rounded`}>
                        <div className={`w-1/5 table-cell p-3 text-xl`}>Title</div>
                        <div className={`w-1/5 table-cell p-3 text-xl`}>Slug</div>
                        <div className={`w-1/5 table-cell p-3 text-xl`}>Is published</div>
                        <div className={`w-1/5 table-cell p-3 text-xl`}>Is public</div>
                        <div className={`w-1/5 table-cell p-3 text-xl`}>Actions</div>
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


