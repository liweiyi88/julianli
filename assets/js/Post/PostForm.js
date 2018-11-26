import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
import SimpleMDE from 'simplemde';

export default class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            slug: '',
            content: '',
            selectedTags: null
        };

        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTagsSelectChange = this.handleTagsSelectChange.bind(this);
    }

    componentDidMount() {
        var simplemde = new SimpleMDE({ element: document.getElementById('content') });
    }

    handleTagsSelectChange(selectedOption) {
        this.setState({ selectedTags: selectedOption });
        console.log(`Option selected:`, selectedOption);
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
        
        const tags = [
            {value:1, label:'Life style'},
            {value:2, label:'Symfony'},
            {value:3, label:'Tech'},
            {value:4, label:'Security'}
        ];

        return (
            <form className={`w-full`}>
                { this.hasEditingPost(editingPost) > 0 && (<div>Id: {editingPost.id}</div>)}
                <div>
                    <input
                        className={`form-input focus:outline-none focus:bg-white focus:border-blue`}
                        onChange={this.handleChange}
                        type='text'
                        name='title'
                        id='post_title'
                        placeholder={`Title`}
                        value={this.hasEditingPost(editingPost) ? editingPost.title : title}
                    />
                </div>

                <div className={`mt-5`}>
                    <input
                        className={`form-input focus:outline-none focus:bg-white focus:border-blue`}
                        placeholder={`Slug`}
                        onChange={this.handleChange}
                        type='text' name='slug'
                        id='post_slug'
                        value={this.hasEditingPost(editingPost) ? editingPost.slug : slug}
                    />
                </div>

                <div className={`mt-5`}>
                    <textarea onChange={this.handleChange} id='content' name='content' value={this.hasEditingPost(editingPost) ? editingPost.content : content}/>
                </div>

                <div className={`mt-5`}>
                    <CreatableSelect
                        theme={(theme) => ({
                            ...theme,
                            spacing: {
                                ...theme.spacing,
                                controlHeight: '3rem'
                            }
                        })}

                        value={this.state.selectedTags}
                        options={tags}
                        onChange={this.handleTagsSelectChange}
                        isMulti
                        isValidNewOption={(inputValue, selectValue, selectOptions) => {
                            const isNotDuplicated = !selectOptions
                                .map(option => option.label)
                                .includes(inputValue);
                            const isNotEmpty = inputValue !== '';
                            return isNotEmpty && isNotDuplicated;
                        }}
                    />
                </div>

                <button type='submit'>{this.hasEditingPost(editingPost) > 0 ? 'Edit' : 'Save'}</button>
                <button type='cancel' onClick={this.handleCancelClick}>Cancel</button>
            </form>
        );
    }
}

PostForm.propTypes = {
    editingPost: PropTypes.object,
    onCancelPost: PropTypes.func.isRequired
};
