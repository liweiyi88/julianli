import React from 'react';
import PostList from './PostList';

export default function Posts(props) {

    const {posts, onDeletePost} = props;

    return (
        <div>
            <h1>Post list</h1>

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
                    onDeletePost={onDeletePost}
                />
            </table>
        </div>
    )
}
