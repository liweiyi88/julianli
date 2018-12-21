import React from 'react';
import {render} from 'react-dom';
import 'highlight.js/styles/github.css';
import '../css/app.scss';
import PostShow from "./Post/PostShow";

render(
    <div>
        <PostShow id={document.getElementById('post').dataset.id}/>
    </div>,
    document.getElementById('post')
);
