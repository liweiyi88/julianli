import React, {Component} from 'react';
import Posts from './Posts';

export default class PostApp extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            node: {},
            posts: [
                {
                    id:1,
                    title: 'Welcome one',
                    content:'As a developer, I was hurry to implement what I had learnt by creating some side projects a few years ago. However, Those side projects became a burden and they even made me frustrated with writing code for self-learning. The reason is simple, the scope of those projects were too big, I gradually lost my confidence and finally gave up Last year, I changed my strategy in terms of coding for self-learning. I began to learn some specific tools/concepts and try to create small but deliverable prototypes rather than try to achieve some general and popular ideas (e.g. CRM, CMS and E-commerce etc). I spent a few weeks on understanding what are the best use cases for using Message Queue, what are most popular Message Queue service providers and how to implement Background workers by using Symfony. Then, I spent another few weeks on reading the source code from Laravel Queue and completing a prototype. As an extra challenge, I also learnt how to provision servers with Ansible and build a automatic CI/CD pipeline with Circle CI and Ansistrano. It was a great fun and I gained the happiness of self-learning again!',
                    published: true,
                    public:true,
                    slug:'fake-content'
                },
                {id:2, title: 'Welcome two', content:'real fake content', published: false, public: false, slug:'real-fake-content'}
            ],
            editingPost: {},
            clickPosition: {},
            editingMenuId: null
        };

        this.handleCancelPostSubmit = this.handleCancelPostSubmit.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleClickPosition = this.handleClickPosition.bind(this);
        this.handleEditMenuId = this.handleEditMenuId.bind(this);
    }

    handleCancelPostSubmit() {
        this.setState({
            editingPost: {}
        });
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

    handleClickPosition(e) {
        this.setState({
            clickPosition: {
                x: e.clientX,
                y: e.clientY
            }
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
                onClickPosition={this.handleClickPosition}
                onEditMenuClick={this.handleEditMenuId}
            />
        )
    }
}
