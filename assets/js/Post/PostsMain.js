import React, {Component} from 'react';
import Posts from './Posts';
import {getPosts, deletePost} from "../Api/api";
import ContentLoader from "react-content-loader";

export default class PostsMain extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            editingMenuId: null,
            isLoading: true
        };

        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleEditMenuId = this.handleEditMenuId.bind(this);
        this.handlePublishToggleClick = this.handlePublishToggleClick.bind(this);
        this.handlePublicToggleClick = this.handlePublicToggleClick.bind(this);
        this.handleCreatePostRedirect = this.handleCreatePostRedirect.bind(this);
    }

    componentDidMount() {
        getPosts()
            .then((data) => {
                this.setState({
                    posts: data,
                    isLoading: false
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
                loader={<ContentLoader
                    height={150}
                    width={600}
                    speed={2}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
                    <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
                    <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />
                    <rect x="15" y="20" rx="3" ry="3" width="130" height="10" />
                    <rect x="155" y="20" rx="3" ry="3" width="130" height="10" />
                    <rect x="15" y="40" rx="3" ry="3" width="90" height="10" />
                    <rect x="115" y="40" rx="3" ry="3" width="60" height="10" />
                    <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />
                    <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
                </ContentLoader>}
            />
        )
    }
}
