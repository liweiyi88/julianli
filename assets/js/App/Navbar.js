import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar()
{
    return (
        <nav className={`hidden uppercase mt-3 md:flex tracking-wide mb-12`}>
            <NavLink activeStyle={{color:'black'}} to={`/articles`} className={`text-grey-dark text-sm font-semibold no-underline hover:text-black mr-5`}>Articles</NavLink>
            <NavLink activeStyle={{color:'black'}} to={`/projects`} className={`text-grey-dark text-sm font-semibold no-underline hover:text-black mr-5`}>Projects</NavLink>
            <NavLink activeStyle={{color:'black'}} to={`/hire-me`} className={`text-grey-dark text-sm font-semibold no-underline hover:text-black mr-5`}>Hire me</NavLink>
        </nav>
    );
}
