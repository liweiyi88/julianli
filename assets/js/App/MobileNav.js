import React from 'react';
import {Link} from "react-router-dom";

export default function MobileNav(props) {
    return (
        <div className="md:hidden z-10 bg-white fixed pin pt-24 block">
            <div className="text-lg overflow-y-auto pt-6 pb-8 px-12 max-h-full overflow-y-auto">
                <Link replace={true} to={`/articles`} onClick={props.onMobileMenuClicked} className={`block mb-8 text-lg text-black font-bold no-underline hover:text-black`}>Articles</Link>
                <Link replace={true} to={`/projects`} onClick={props.onMobileMenuClicked} className={`block mb-8 text-lg text-black font-bold no-underline hover:text-black`}>Projects</Link>
                <Link replace={true} to={`/hire-me`} onClick={props.onMobileMenuClicked} className={`block mb-8 text-lg text-black font-bold no-underline hover:text-black`}>Hire me</Link>
            </div>
        </div>
    );
}
