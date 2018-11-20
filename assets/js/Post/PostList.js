import React from 'react';
import PropTypes from 'prop-types';
import Posts from "./Posts";

export default function PostList(props) {

    const {posts, onEditPost, onDeletePost} = props;

    function shortDescription(content) {
        let output = content.trim().split(' ');

        if (output.length > 30) {
            return output.slice(0, 30).join(' ') + '...';
        }

        return output.slice(0, 30).join(' ') + '...';
    }

    return (
        posts.map((post) => (
            <div className={`flex-col mt-4 border-b`} key={post.id}>
                <div className={`text-2xl font-bold`}>{post.title}</div>
                <div className={`text-grey-darker text-lg mt-4 leading-normal`}>{shortDescription(post.content)}</div>

                <div className={`flex mt-4 mb-4 text-grey-dark text-base`}>
                    <div className={`pr-2`}>{post.published ? 'Published' : 'Draft' }</div> <div>{post.public ? 'Public' : 'Private' }</div>
                    <div className={`cursor-pointer`}>
                        <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><path d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z" fill-rule="evenodd"></path></svg>
                        <div className={`absolute pin w-24 h-24 pl-3 pt-2 pb-2 pr-2 rounded shadow border text-sm`}>
                                <ul className={`list-reset`}>
                                    <li className={`pt-4`}>Edit post</li>
                                    <li className={`pt-4`}>Delete post</li>
                                </ul>
                        </div>
                    </div>
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