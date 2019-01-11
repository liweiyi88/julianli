import React from 'react';
import Avatar from './Avatar';
import Navbar from './Navbar';

export default function Header(props) {
    const {activeName} = props;

    return (
        <React.Fragment>
            <Avatar />
            <div className={`text-xl font-extrabold uppercase`}>
                <span className={`text-green mr-1`}>Julian</span><span className={`text-grey-darker`}>Li</span>
            </div>
            <Navbar activeName={activeName}/>
        </React.Fragment>
    )
}
