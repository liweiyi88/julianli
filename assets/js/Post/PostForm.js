import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

export default class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            slug: '',
            content: '',
            selectedFreeLancer: null,
            selectedTags: null
        };

        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFreelancerSelectChange = this.handleFreelancerSelectChange.bind(this);
        this.handleTagsSelectChange = this.handleTagsSelectChange.bind(this);
    }

    handleFreelancerSelectChange(selectedOption) {
        this.setState({ selectedFreeLancer: selectedOption });
        console.log(`Option selected:`, selectedOption);
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
        
        const freelancers = [
            {value:1, label:'Julian Li'},
            {value:2, label:'Weiyi'}
        ];
        
        const tags = [
            {value:1, label:'Life style'},
            {value:2, label:'Symfony'},
            {value:3, label:'Tech'},
            {value:4, label:'Security'}
        ];

        return (
            <form>
                { this.hasEditingPost(editingPost) > 0 && (<div>Id: {editingPost.id}</div>)}
                <div>
                    <label htmlFor='post_title'>Title</label>
                    <input onChange={this.handleChange} type='text' name='title' id='post_title' value={this.hasEditingPost(editingPost) ? editingPost.title : title}/>
                </div>

                <div>
                    <label htmlFor='post_slug'>Slug</label>
                    <input onChange={this.handleChange} type='text' name='slug' id='post_slug' value={this.hasEditingPost(editingPost) ? editingPost.slug : slug}/>
                </div>

                <div>
                    <label htmlFor='post_content'>Content</label>
                    <textarea onChange={this.handleChange} id='content' name='content' value={this.hasEditingPost(editingPost) ? editingPost.content : content}/>
                </div>

                <br/>

                <h3>Freelancer</h3>

                <Select
                    value={this.state.selectedFreeLancer}
                    options={freelancers}
                    onChange={this.handleFreelancerSelectChange}
                />

                <h3>Tags</h3>
                <CreatableSelect
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
