import React, {Component} from 'react';
import Posts from './Posts';
import {getPosts} from "../Api/api";

export default class PostsMain extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            editingMenuId: null
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
                    posts: data
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
                posts: prevState.posts.filter(post => post.id !== id)
            }
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
            />
        )
    }
}
