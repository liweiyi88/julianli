import React from 'react';
import {Component} from 'react';

export default class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            slug: '',
            content: ''
        };
    }

    render() {
        const {title, slug, content} = this.state;
        const {editingPost} = this.props;

        return (
            <form>
                { Object.getOwnPropertyNames(editingPost).length > 0 && (<div>Id: {editingPost.id}</div>)}
                <div>
                    <label htmlFor="post_title">Title</label>
                    <input type="text" id="post_title" value={editingPost ? editingPost.title : title}/>
                </div>

                <div>
                    <label htmlFor="post_slug">Slug</label>
                    <input type="text" id="post_slug" value={editingPost ? editingPost.slug : slug}/>
                </div>

                <div>
                    <label htmlFor="post_content">Content</label>
                    <textarea id="post_content" value={editingPost ? editingPost.content : content}/>
                </div>
            </form>
        );
    }
}
