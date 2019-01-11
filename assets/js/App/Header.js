import React from 'react';
import Avatar from './Avatar';
import Navbar from './Navbar';
import {NavLink} from "react-router-dom";

export default function Header(props) {
    const {activeName} = props;

    return (
        <React.Fragment>
            <Avatar />
            <div className={`text-xl font-extrabold uppercase`}>
                <NavLink className={`no-underline`} to={`/preview`}>
                    <span className={`text-green mr-1`}>Julian</span><span className={`text-grey-darker`}>Li</span>
                </NavLink>
            </div>
            <Navbar activeName={activeName}/>
        </React.Fragment>
    )
}
