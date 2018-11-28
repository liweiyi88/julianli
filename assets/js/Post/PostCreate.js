import React, {Component} from 'react';
import PostForm from './PostForm';

export default class PostCreate extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`container mx-auto w-3/4`}>
                <div className={`flex items-center mt-10 mb-4 justify-center md:flex md:items-center mb-6`}>
                    <PostForm
                        {...this.state}
                    />
                </div>
            </div>
        )
    }
}
