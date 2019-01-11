import React from 'react';

export default function Navbar(props)
{
    const {
        activeName
    } = props;

    return (
        <nav className={`uppercase mt-3 flex tracking-wide`}>
            <a href="/articles" className={`${activeName === 'article' ? 'text-black' : 'text-grey-dark'} text-sm font-semibold no-underline hover:text-black mr-5`}>Articles</a>
            <a href="/projects" className={`${activeName === 'projects' ? 'text-black' : 'text-grey-dark'} text-sm font-semibold no-underline hover:text-black mr-5`}>Projects</a>
            <a href="/hire-me" className={`${activeName === 'hireMe' ? 'text-black' : 'text-grey-dark'} text-sm font-semibold no-underline hover:text-black mr-5`}>Hire me</a>
        </nav>
    );
}
