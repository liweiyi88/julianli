import React from 'react';
import Avatar from './Avatar';
import Navbar from './Navbar';
import {Link} from "react-router-dom";
import MobileNav from "./MobileNav";

export default function Header(props) {
    const menuIcon = props.mobileNavExpand === true ?
        <svg fill={`currentColor`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="text-black h-6 w-6">
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
        </svg> : <svg fill={`currentColor`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      className="block text-black h-6 w-6 block">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>

    return (
        <React.Fragment>
            <div className={`relative z-20 flex justify-between items-center mb-6 md:mb-4`}>
                <Avatar onMobileMenuHidden={props.onMobileMenuHidden}/>
                <div className="block md:hidden">
                    <button onClick={props.onMobileMenuClicked} className={`focus:outline-none block`}>{menuIcon}</button>
                </div>
            </div>
            <div className={`hidden md:block text-3xl font-extrabold`}>
                <Link className={`no-underline`} to={`/`} replace>
                    <span className={`text-green mr-1`}>Julian</span><span className={`text-grey-darker`}>Li</span>
                </Link>
            </div>

            {props.mobileNavExpand && <MobileNav onMobileMenuClicked={props.onMobileMenuHidden}/>}

            <Navbar />
        </React.Fragment>
    )
}


