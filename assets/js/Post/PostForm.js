import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
import SimpleMDE from 'simplemde';
import Toggle from './Toggle';

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

        this.handleChange = this.handleChange.bind(this);
        this.handleTagsSelectChange = this.handleTagsSelectChange.bind(this);
    }

    componentDidMount() {
        const simplemde = new SimpleMDE({ element: document.getElementById('content') });

        simplemde.codemirror.on('change', () =>{
            this.setState({
                content: simplemde.value()
            });
        });
    }

    handleTagsSelectChange(selectedOption) {
        this.setState({ selectedTags: selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    handleChange(event) {
        const target = event.target;
        console.log(target);

        this.setState({
            [target.name]: target.type === 'checkbox'
                ? target.checked
                : target.value
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

        const toggle = this.hasEditingPost(editingPost) ? editingPost.public : true;

        return (
            <div className={`w-full`}>
                <div className={`flex flex-row-reverse`}>
                    <div><button className={`bg-transparent hover:bg-green text-green-dark hover:text-white py-2 px-4 border border-green hover:border-transparent rounded`}>Ready to publish?</button></div>
                    <div className={`flex items-center mr-4`}>
                        <Toggle
                            toggle={toggle}
                            toggleOnText={`It is now public`}
                            toggleOnTextColor={`text-green`}
                            toggleOffText={`It is now private`}
                            toggleOffTextColor={`text-orange`}
                        />
                    </div>
                </div>
                { this.hasEditingPost(editingPost) > 0 && (<div>Id: {editingPost.id}</div>)}
                <div className={`mt-5`}>
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
                        placeholder={`Add a tags..`}
                        isValidNewOption={(inputValue, selectValue, selectOptions) => {
                            const isNotDuplicated = !selectOptions
                                .map(option => option.label)
                                .includes(inputValue);
                            const isNotEmpty = inputValue !== '';
                            return isNotEmpty && isNotDuplicated;
                        }}
                    />
                </div>

                <div className={`mt-5`}>
                    <textarea onChange={this.handleChange} id='content' name='content' value={this.hasEditingPost(editingPost) ? editingPost.content : content}/>
                </div>


            </div>
        );
    }
}

PostForm.propTypes = {
    editingPost: PropTypes.object
};
