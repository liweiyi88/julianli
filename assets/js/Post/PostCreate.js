import React, {Component} from 'react';
import PostForm from './PostForm';
import SimpleMDE from "simplemde";

export default class PostCreate extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            slug: '',
            content: '',
            selectedTags: null,
            isPublished: null,
            isPublic: true
        };

        this.handleFormElementChange = this.handleFormElementChange.bind(this);
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
        const tags = [
            {value:1, label:'Life style'},
            {value:2, label:'Symfony'},
            {value:3, label:'Tech'},
            {value:4, label:'Security'}
        ];

        return (
            <div className={`container mx-auto w-3/4`}>
                <div className={`flex items-center mt-10 mb-4 justify-center md:flex md:items-center mb-6`}>
                    <PostForm
                        {...this.state}
                        tags={tags}
                        onElementChange={this.handleFormElementChange}
                        onTagsSelectedChange={this.handleTagsSelectChange}
                    />
                </div>
            </div>
        )
    }
}
