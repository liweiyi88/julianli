import React, {Component} from 'react';
import PostForm from './PostForm';
import SimpleMDE from "simplemde";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import withReactContent from 'sweetalert2-react-content';
import {createTag, getFreelancers, getPost, getTags, updatePost} from "../Api/api";
import Loader from "../Utils/Loader";
import Route from "../Constants/Route";

export default class PostEdit extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            id: null,
            selectedAuthor: null,
            authors: [],
            selectedTags: [],
            tags: [],
            title: '',
            slug: '',
            content: '',
            isPublished: null,
            isPublic: true,
            isTagsLoading: true,
            isAuthorsLoading: true
        };

        this.handleFormElementChange = this.handleFormElementChange.bind(this);
        this.handleTagsSelectChange = this.handleTagsSelectChange.bind(this);
        this.handlePublicToggleClick = this.handlePublicToggleClick.bind(this);
        this.handleNewTagCreation = this.handleNewTagCreation.bind(this);
        this.handleAuthorSelectChange = this.handleAuthorSelectChange.bind(this);
        this.handlePublishPost = this.handlePublishPost.bind(this);
    }

    componentDidMount() {
        getPost(this.props.id).then(data => {
            this.setState({
                isLoading: false,
                id: data['id'],
                title: data['title'],
                slug: data['slug'],
                content: data['content'],
                isPublished: data['isPublished'],
                isPublic: data['isPublic'],
                selectedAuthor: {value:data.freelancer['@id'], label:data.freelancer['firstName']+' '+data.freelancer['lastName']},
                selectedTags: data.tags.map(tag => {
                    return {value:tag['@id'], label:tag.name}
                })
            })
        }).then(() => {
            const simplemde = new SimpleMDE({ element: document.getElementById('content') });

            simplemde.codemirror.on('change', () =>{
                this.setState({
                    content: simplemde.value()
                });
            });
        });


        getTags()
            .then((data) => {
                this.setState({
                    isTagsLoading: false,
                    tags: data.map(tag => {
                        return {value:tag['@id'], label:tag.name}
                    })
                })
            });

        getFreelancers()
            .then((data) => {
                this.setState({
                    isAuthorsLoading: false,
                    authors: data.map(author => {
                        return {value:author['@id'], label:author['firstName']+' '+author['lastName']}
                    })
                })
            });
    }

    handlePublishPost() {

        this.setState({
            isLoading: true
        });

        let post = {
            id: this.state.id,
            title: this.state.title,
            slug: this.state.slug,
            freelancer: this.state.selectedAuthor.value,
            tags: this.state.selectedTags.map(tag => {
                return tag.value;
            }),
            isPublic: this.state.isPublic,
            isPublished: true,
            content: this.state.content
        };

        updatePost(post)
            .then(() => {
                const alert = withReactContent(Swal);

                const message = alert.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000
                });

                message({
                    type: 'success',
                    title: 'Updated, now redirecting...'
                }).then(() => {
                    window.location.href = Route.home;
                })
            })
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
            let tag = {label: response.name, value: response['@id']};

            this.setState({
                isTagsLoading: false,
                selectedTags: [...this.state.selectedTags, tag],
                tags: [...this.state.tags, tag]
            });
        });
    }

    handleAuthorSelectChange(selectedOption) {
        this.setState({ selectedAuthor: selectedOption });
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
                    {this.state.isLoading ? (<div>{<Loader/>}</div>) :
                        <PostForm
                        {...this.state}
                        onElementChange={this.handleFormElementChange}
                        onTagsSelectedChange={this.handleTagsSelectChange}
                        onNewTagCreation={this.handleNewTagCreation}
                        onPublicToggleClick={this.handlePublicToggleClick}
                        onAuthorSelectedChange={this.handleAuthorSelectChange}
                        onPublishPost={this.handlePublishPost}
                    />}
                </div>
            </div>
        )
    }
}
