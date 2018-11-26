import PostCreate from './Post/PostCreate';
import React from 'react';
import {render} from 'react-dom';
import '../css/app.scss';
import 'simplemde/dist/simplemde.min.css';

render(
    <div>
        <PostCreate />
    </div>,
    document.getElementById('post')
);
