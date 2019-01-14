import React from 'react';
import Avatar from './Avatar';
import Navbar from './Navbar';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <React.Fragment>
            <Avatar />
            <div className={`text-3xl font-extrabold`}>
                <Link className={`no-underline`} to={`/`} replace>
                    <span className={`text-green mr-1`}>Julian</span><span className={`text-grey-darker`}>Li</span>
                </Link>
            </div>
            <Navbar />
        </React.Fragment>
    )
}
