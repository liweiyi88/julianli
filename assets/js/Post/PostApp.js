import React, {Component} from 'react';
import Posts from './Posts';

export default class PostApp extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            posts: [
                {id:1, title: 'Welcome one', published: true, public:true, slug:'fsdfdsfsd'},
                {id:2, title: 'Welcome two', published: false, public: false, slug:'sdfdsf'}
            ]
        };

        this.handleDeletePost = this.handleDeletePost.bind(this);
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
                onDeletePost={this.handleDeletePost}
            />
        )
    }
}
