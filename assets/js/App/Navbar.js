import React from 'react';

export default function Navbar()
{
    return (
        <nav className={`hidden uppercase mt-3 md:flex tracking-wide mb-12`}>
            <a href={'/articles'} className={`text-grey-dark text-sm font-semibold no-underline hover:text-black mr-5`}>Articles</a>
            <a href={'/projects'} className={`text-grey-dark text-sm font-semibold no-underline hover:text-black mr-5`}>Projects</a>
            <a href={'/hire-me'} className={`text-grey-dark text-sm font-semibold no-underline hover:text-black mr-5`}>Hire me</a>
        </nav>
    );
}
