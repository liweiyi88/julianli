import PostsMain from './Post/PostsMain';
import React from 'react';
import {render} from 'react-dom';
import '../css/app.scss';
import 'sweetalert2/src/sweetalert2.scss';

render(
    <div>
        <PostsMain />
    </div>,
    document.getElementById('post')
);
