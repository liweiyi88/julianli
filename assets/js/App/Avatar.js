import React from 'react';

export default function Avatar(props) {
    return (
        <div className={`mb-4`}>
            <a href="/">
                <img src="https://avatars2.githubusercontent.com/u/7248260?s=460&v=4" alt="" className={`h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full`}/>
            </a>
        </div>
    );
}
