import PostEdit from './Post/PostEdit';
import React from 'react';
import {render} from 'react-dom';
import 'simplemde/dist/simplemde.min.css';
import '../css/admin.scss';
import 'sweetalert2/src/sweetalert2.scss';

render(
    <div>
        <PostEdit id={document.getElementById('post').dataset.id}/>
    </div>,
    document.getElementById('post')
);
