import React from 'react';
import PostList from './PostList';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import PostConstants from '../Constants/PostConstants';
import Search from "../UtilComponent/Search";

export default function Posts(props) {

    const {
        currentPage,
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
        <div>
            <div className={`bg-white border-b border-grey-lighter w-full fixed pin-t pin-x z-100 h-16`}>
                <div className={`w-2/5 mx-auto pt-3`}>
                    <Search />
                </div>
            </div>
            <div className={`container mx-auto w-3/4 pl-6 pr-6`}>
                <div className={`flex items-center mt-24 mb-4 justify-between`}>
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
                    <div className={`my-12`}>
                        <ReactPaginate
                            initialPage={0}
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={PostConstants.marginPagesDisplayed}
                            pageRangeDisplayed={PostConstants.pageRangeDisplayed}
                            disableInitialCallback={true}
                            onPageChange={onPageClick}
                            containerClassName={"pagination"}
                            forcePage={currentPage}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                )}
            </div>
        </div>
    )
}

Posts.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onPageClick: PropTypes.func.isRequired,
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


