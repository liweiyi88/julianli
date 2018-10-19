import React from 'react';
import PostForm from './PostForm';
import PostList from './PostList';

export default function Posts(props) {

    const {editingPost, posts, onEditPost, onDeletePost} = props;

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

            <PostForm editingPost={editingPost} a={'c'}/>
        </div>
    )
}
