import PostEdit from './Post/PostEdit';
import React from 'react';
import {render} from 'react-dom';
import 'simplemde/dist/simplemde.min.css';
import '../css/app.scss';

render(
    <div>
        <PostEdit id={49}/>
    </div>,
    document.getElementById('post')
);
