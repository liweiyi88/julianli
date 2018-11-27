import PostCreate from './Post/PostCreate';
import React from 'react';
import {render} from 'react-dom';
import 'simplemde/dist/simplemde.min.css';
import '../css/app.scss';

render(
    <div>
        <PostCreate />
    </div>,
    document.getElementById('post')
);
