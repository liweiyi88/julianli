import React, {Component} from 'react';
import Posts from './Posts';
import {getPosts, deletePost, updatePost} from '../Api/api';
import Loader from '../UtilComponent/Loader';
import PostConstants from '../Constants/PostConstants';

export default class PostsMain extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            editingMenuId: null,
            isLoading: true,
            pageCount: 0,
            currentPage: 0
        };

        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleEditMenuId = this.handleEditMenuId.bind(this);
        this.handlePublishToggleClick = this.handlePublishToggleClick.bind(this);
        this.handlePublicToggleClick = this.handlePublicToggleClick.bind(this);
        this.handleCreatePostRedirect = this.handleCreatePostRedirect.bind(this);
        this.getUpdatablePost = this.getUpdatablePost.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        getPosts()
            .then((data) => {
                this.setState({
                    posts: data['hydra:member'],
                    isLoading: false,
                    pageCount: data['hydra:totalItems'] / PostConstants.itemPerPage
                })
            });
    }

    handleCreatePostRedirect() {
        window.location.href = '/admin/posts/create';
    }

    handlePublishToggleClick(event, id) {
        this.setState((prevState) => {
            return {
                posts: prevState.posts.map(post => {
                    if (post.id !== id) {
                        return post;
                    }

                    post.isPublished = !post.isPublished;

                    updatePost(this.getUpdatablePost(post));

                    return post;
                })
            }
        })
    }

    handlePublicToggleClick(event, id) {
        this.setState((prevState) => {
            return {
                posts: prevState.posts.map(post => {
                    if (post.id !== id) {
                        return post;
                    }

                    post.isPublic = !post.isPublic;

                    updatePost(this.getUpdatablePost(post));

                    return post;
                })
            }
        })
    }

    handleDeletePost(id) {
        this.setState((prevState) => {
            return {
                posts: prevState.posts.map(post => {
                    if (post.id !== id) {
                        return post;
                    }

                    return {...post, isDeleting: true};
                })
            };
        });

        return deletePost(id)
            .then(() => {
                this.setState((prevState) => {
                    return {
                        posts: prevState.posts.filter(post => post.id !== id)
                    };
                });
            });
    }

    handleEditMenuId(postId) {
        this.setState({
            editingMenuId: postId
        });
    }

    handleEditPost(post) {
        this.setState({
            editingPost: post
        });
    }

    handlePageClick(data) {
        let selectedPage = data.selected;

        this.setState({
            isLoading: true
        });

        getPosts(selectedPage+1).then((data) => {
            this.setState({
                isLoading: false,
                posts: data['hydra:member'],
                currentPage: selectedPage
            })
        })
    }

    getUpdatablePost(post) {
        let updatablePost = Object.assign({}, post);

        updatablePost.freelancer = post.freelancer['@id'];
        updatablePost.tags = post.tags.map(tag => {
            return tag['@id'];
        });

        return updatablePost;
    }

    render() {
        return (
            <Posts
                {...this.props}
                {...this.state}
                onDeletePost={this.handleDeletePost}
                onEditPost={this.handleEditPost}
                onEditMenuClick={this.handleEditMenuId}
                onPublishToggleClick={this.handlePublishToggleClick}
                onPublicToggleClick={this.handlePublicToggleClick}
                onNewPostClick={this.handleCreatePostRedirect}
                onPageClick={this.handlePageClick}
                loader={<Loader />}
            />
        )
    }
}
