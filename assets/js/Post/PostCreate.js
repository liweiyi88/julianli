import React, {Component} from 'react';
import PostForm from './PostForm';
import SimpleMDE from "simplemde";
import {createTag, getTags} from "../Api/api";

export default class PostCreate extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            title: '',
            slug: '',
            content: '',
            selectedTags: [],
            isPublished: null,
            isPublic: true,
            isTagsLoading: true
        };

        this.handleFormElementChange = this.handleFormElementChange.bind(this);
        this.handleTagsSelectChange = this.handleTagsSelectChange.bind(this);
        this.handlePublicToggleClick = this.handlePublicToggleClick.bind(this);
        this.handleNewTagCreation = this.handleNewTagCreation.bind(this);
    }

    componentDidMount() {
        const simplemde = new SimpleMDE({ element: document.getElementById('content') });

        simplemde.codemirror.on('change', () =>{
            this.setState({
                content: simplemde.value()
            });
        });

        getTags()
            .then((data) => {
                this.setState({
                    isTagsLoading: false,
                    tags: data.map(tag => {
                        return {value:tag.id, label:tag.name}
                    })
                })
            });
    }

    handlePublicToggleClick() {
        this.setState((prevState) => {
            return {
                isPublic: !prevState.isPublic
            }
        })
    }

    handleNewTagCreation(inputValue) {
        this.setState({
            isTagsLoading: true
        });

        let tagPayload = {name:inputValue};

        createTag(tagPayload).then((response) => {
            let tag = {label: response.name, value: response.id};

            this.setState({
                isTagsLoading: false,
                selectedTags: [...this.state.selectedTags, tag],
                tags: [...this.state.tags, tag]
            });
        });
    }

    handleTagsSelectChange(selectedOption) {
        this.setState({ selectedTags: selectedOption });
    }

    handleFormElementChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.type === 'checkbox'
                ? target.checked
                : target.value
        });
    }

    render() {

        return (
            <div className={`container mx-auto w-3/4`}>
                <div className={`flex items-center mt-10 mb-4 justify-center md:flex md:items-center mb-6`}>
                    <PostForm
                        {...this.state}
                        onElementChange={this.handleFormElementChange}
                        onTagsSelectedChange={this.handleTagsSelectChange}
                        onNewTagCreation={this.handleNewTagCreation}
                        onPublicToggleClick={this.handlePublicToggleClick}
                    />
                </div>
            </div>
        )
    }
}
