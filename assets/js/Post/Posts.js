import React from 'react';
import PostList from './PostList';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

export default function Posts(props) {

    const {
        pageCount,
        editingMenuId,
        posts,
        isLoading,
        onEditMenuClick,
        onDeletePost,
        onPublishToggleClick,
        onPublicToggleClick,
        onNewPostClick,
        onPageClick
    } = props;

    return (
        <div className={`container mx-auto w-3/4 pl-6 pr-6`}>
            <div className={`flex items-center mt-10 mb-4 justify-between`}>
                <div className={`text-3xl font-black`}>Sweets and bitters of my life</div>

                <div>
                    <button className={`btn btn-green hover:bg-green-dark`} onClick={onNewPostClick}>New story</button>
                </div>
            </div>

            <div className={`flex flex-col`}>
                {isLoading ?  (
                    <div>{props.loader}</div>
                ) :  <PostList
                    posts={posts}
                    onEditMenuClick={onEditMenuClick}
                    editingMenuId={editingMenuId}
                    onDeletePost={onDeletePost}
                    onPublishToggleClick={onPublishToggleClick}
                    onPublicToggleClick={onPublicToggleClick}
                />}
            </div>

            {!isLoading && (
                <div className={`mt-12`}>
                    <ReactPaginate
                        initialPage={0}
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={onPageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            )}
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


