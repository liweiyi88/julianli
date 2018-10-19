import React from 'react';

export default function PostList(props) {

    const {posts, onEditPost, onDeletePost} = props;

    return (
        <tbody>
        {posts.map((post) => (
            <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>{post.published ? 'Published' : 'Draft' }</td>
                <td>{post.public ? 'Public' : 'Private' }</td>
                <td><button onClick={() => onEditPost(post)}>edit</button> <button onClick={() => onDeletePost(post.id)}>delete</button></td>
            </tr>
        ))}
        </tbody>
    )
}
