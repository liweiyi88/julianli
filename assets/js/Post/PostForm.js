import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';

export default class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            slug: '',
            content: ''
        };

        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.type === 'checkbox'
                ? target.checked
                : target.value
        });
    }

    handleCancelClick(event) {
        event.preventDefault();

        const {onCancelPost} = this.props;

        onCancelPost();

        this.setState({
            id: '',
            title: '',
            slug: '',
            content: ''
        });
    }

    hasEditingPost(editingPost) {
        if (editingPost === undefined) {
            return false;
        }

        return Object.getOwnPropertyNames(editingPost).length > 0;
    }

    render() {
        const {title, slug, content} = this.state;
        const {editingPost} = this.props;

        return (
            <form>
                { this.hasEditingPost(editingPost) > 0 && (<div>Id: {editingPost.id}</div>)}
                <div>
                    <label htmlFor="post_title">Title</label>
                    <input onChange={this.handleChange} type="text" name="title" id="post_title" value={this.hasEditingPost(editingPost) ? editingPost.title : title}/>
                </div>

                <div>
                    <label htmlFor="post_slug">Slug</label>
                    <input onChange={this.handleChange} type="text" name="slug" id="post_slug" value={this.hasEditingPost(editingPost) ? editingPost.slug : slug}/>
                </div>

                <div>
                    <label htmlFor="post_content">Content</label>
                    <textarea onChange={this.handleChange} id="content" name="content" value={this.hasEditingPost(editingPost) ? editingPost.content : content}/>
                </div>

                <button type="submit">{this.hasEditingPost(editingPost) > 0 ? "Edit" : "Save"}</button>
                <button type="cancel" onClick={this.handleCancelClick}>Cancel</button>
            </form>
        );
    }
}

PostForm.propTypes = {
    editingPost: PropTypes.object,
    onCancelPost: PropTypes.func.isRequired
};
