import React, {Component} from 'react';
import Posts from './Posts';

export default class PostsMain extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            node: {},
            posts: [
                {
                    id:199,
                    title: 'Welcome one',
                    content:'As a developer, I was hurry to implement what I had learnt by creating some side projects a few years ago. However, Those side projects became a burden and they even made me frustrated with writing code for self-learning. The reason is simple, the scope of those projects were too big, I gradually lost my confidence and finally gave up Last year, I changed my strategy in terms of coding for self-learning. I began to learn some specific tools/concepts and try to create small but deliverable prototypes rather than try to achieve some general and popular ideas (e.g. CRM, CMS and E-commerce etc). I spent a few weeks on understanding what are the best use cases for using Message Queue, what are most popular Message Queue service providers and how to implement Background workers by using Symfony. Then, I spent another few weeks on reading the source code from Laravel Queue and completing a prototype. As an extra challenge, I also learnt how to provision servers with Ansible and build a automatic CI/CD pipeline with Circle CI and Ansistrano. It was a great fun and I gained the happiness of self-learning again!',
                    published: true,
                    public:true,
                    slug:'fake-content',
                    createdAt: 'Jun 21, 2018'
                },
                {id:200, title: 'Welcome two', content:'real fake content', published: false, public: false, slug:'real-fake-content', createdAt: 'Apr 2, 2018'}
            ],
            editingPost: {},
            editingMenuId: null
        };

        this.handleCancelPostSubmit = this.handleCancelPostSubmit.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleEditMenuId = this.handleEditMenuId.bind(this);
        this.handlePublishToggleClick = this.handlePublishToggleClick.bind(this);
        this.handlePublicToggleClick = this.handlePublicToggleClick.bind(this);
        this.handleCreatePostRedirect = this.handleCreatePostRedirect.bind(this);
    }

    handleCreatePostRedirect() {
        window.location.href = '/admin/posts/create';
    }

    handleCancelPostSubmit() {
        this.setState({
            editingPost: {}
        });
    }

    handlePublishToggleClick(event, id) {
        this.setState((prevState) => {
            return {
                posts: prevState.posts.map(post => {
                    if (post.id !== id) {
                        return post;
                    }

                    post.published = !post.published;

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

                    post.public = !post.public;

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
                onCancelPost={this.handleCancelPostSubmit}
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
