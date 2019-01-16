import React from 'react';
import { Link } from 'react-router-dom';

export default function Avatar() {
    return (
        <div className={`mb-6 md:mb-4`}>
            <Link to={`/`} replace>
                <img src="https://avatars2.githubusercontent.com/u/7248260?s=460&v=4" alt="" className={`h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full`}/>
            </Link>
        </div>
    );
}
