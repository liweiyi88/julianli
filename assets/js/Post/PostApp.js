import React, {Component} from 'react';
import Posts from './Posts';

export default class PostApp extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            posts: [
                {id:1, title: 'Welcome one', content:'fake content 1', published: true, public:true, slug:'fake-content'},
                {id:2, title: 'Welcome two', content:'real fake content', published: false, public: false, slug:'real-fake-content'}
            ],
            editingPost: {}
        };

        this.handleCancelPostSubmit = this.handleCancelPostSubmit.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
    }

    handleCancelPostSubmit() {
        this.setState({
            editingPost: {}
        });
    }

    handleEditPost(post) {
        this.setState({
            editingPost: post
        });
    }

    handleDeletePost(id) {
        this.setState((prevState) => {
            return {
                posts: prevState.posts.filter(post => post.id !== id)
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
            />
        )
    }
}
