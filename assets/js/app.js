import React from 'react';
import {render} from "react-dom";
import '../css/app.scss';

render(
    <div>
        <div className={`h-4 w-full bg-green`} />
        <div className={`container`}>
            <div className={`pt-24 pb-8 px-6 lg:px-64`}>
                <div className={`mb-4`}>
                    <a href="/">
                        <img src="https://avatars2.githubusercontent.com/u/7248260?s=460&v=4" alt="" className={`h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full`}/>
                    </a>
                </div>
                <div className={`text-xl font-extrabold uppercase`}>
                    <span className={`text-green mr-1`}>Julian</span><span className={`text-grey-darker`}>Li</span>
                </div>
                <nav className={`uppercase mt-3 flex tracking-wide`}>
                    <a href="" className={`text-sm text-grey-dark font-semibold no-underline hover:text-black mr-5`}>Articles</a>
                    <a href="" className={`text-sm text-grey-dark font-semibold no-underline hover:text-black mr-5`}>Projects</a>
                    <a href="" className={`text-sm text-grey-dark font-semibold no-underline hover:text-black mr-5`}>Hire me</a>
                </nav>

                <div className={`mt-12 max-w-md`}>
                    <h1 className={`text-2xl font-semibold text-black mb-4`}>
                        Who am I?
                    </h1>
                    <div className={`text-lg text-grey-darker leading-normal spaced-y-6`}>
                        <p className={`mb-6`}>I'm Julian Li, a full-stack developer, I live in Melbourne with my wife and daughter.</p>
                        <p className={`mb-6`}>I am experienced in developing complex web application with/without any PHP framework, equipped with cross-industry domain knowledge.</p>
                        <p className={`mb-6`}><a href="https://reactjs.org/" target={`_blank`} className={`text-green`}>React</a> and <a href="https://tailwindcss.com/" target={`blank`} className={`text-green`}>Tailwind CSS</a> are my favourite tools for front-end development.</p>
                        <p>Right now, I am following recommendation from <a href="https://refactoringui.com/book/" target={`blank`} className={`text-green`}>Refactoring UI to improve my design skill.</a></p>
                    </div>
                </div>

                <div className={`mt-12`}>
                    <ul className={`flex pl-0 items-center`}>
                        <li className={`list-reset mr-5`}>
                            <a href="https://github.com/liweiyi88">
                                <svg className={`fill-current text-grey-darkest`} width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                    <path className="social-icon"
                                          d="M13 0C5.82 0 0 5.82 0 13c0 5.744 3.725 10.616 8.89 12.335.65.12.888-.28.888-.626 0-.31-.01-1.127-.018-2.212-3.616.785-4.38-1.743-4.38-1.743-.59-1.502-1.442-1.902-1.442-1.902-1.18-.806.09-.79.09-.79 1.304.092 1.99 1.34 1.99 1.34 1.16 1.987 3.043 1.413 3.784 1.08.118-.84.454-1.413.825-1.737-2.887-.328-5.922-1.444-5.922-6.426 0-1.418.507-2.58 1.34-3.488-.135-.33-.58-1.65.126-3.44 0 0 1.092-.35 3.576 1.332 1.037-.288 2.15-.432 3.254-.438 1.105.006 2.217.15 3.255.438 2.482-1.682 3.57-1.332 3.57-1.332.71 1.79.265 3.11.13 3.44.834.908 1.337 2.07 1.337 3.488 0 4.995-3.04 6.094-5.935 6.415.466.402.882 1.195.882 2.408 0 1.737-.017 3.14-.017 3.566 0 .347.235.75.894.624C22.28 23.61 26 18.742 26 13c0-7.18-5.82-13-13-13"
                                          fill="#000" fill-rule="evenodd"/>
                                </svg>
                            </a>
                        </li>
                        <li className={`list-reset mr-5`}>
                            <a href="https://www.linkedin.com/in/jweiyi">
                                <svg className={`fill-current text-grey-darkest`} width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
                                    <path className="social-icon"
                                          d="M1.105 7.696h4.678v16.302H1.105V7.696zm2.22-2.04H3.29C1.6 5.657.5 4.41.5 2.833.5 1.222 1.63 0 3.357 0c1.726 0 2.787 1.22 2.82 2.828 0 1.578-1.094 2.83-2.852 2.83zM24.5 24h-5.304v-8.438c0-2.208-.83-3.714-2.655-3.714-1.394 0-2.17 1.016-2.532 1.998-.135.35-.114.84-.114 1.332V24H8.64s.067-14.946 0-16.304h5.254v2.558c.31-1.118 1.99-2.715 4.67-2.715 3.324 0 5.936 2.346 5.936 7.394V24z"
                                          fill-rule="evenodd"/>
                                </svg>
                            </a>
                        </li>
                        <li className={`list-reset`}>
                            <a href="https://twitter.com/liweiyi88">
                                <svg className={`fill-current text-grey-darkest -mb-1`} width="26" height="22" viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg">
                                    <path className="social-icon"
                                          d="M22.937 3.478c1.102-.686 1.947-1.775 2.344-3.07-1.03.636-2.17 1.097-3.387 1.346C20.923.674 19.535 0 18 0c-2.945 0-5.332 2.487-5.332 5.553 0 .436.044.86.136 1.265-4.432-.232-8.362-2.44-10.994-5.803-.46.823-.722 1.777-.722 2.794 0 1.924.942 3.624 2.373 4.622-.873-.028-1.696-.28-2.416-.694v.068c0 2.692 1.837 4.937 4.28 5.445-.448.132-.918.197-1.407.197-.343 0-.68-.033-1.002-.1.677 2.207 2.648 3.815 4.983 3.858-1.827 1.49-4.127 2.377-6.625 2.377-.43 0-.856-.024-1.273-.077C2.36 21.08 5.164 22 8.177 22c9.813 0 15.175-8.463 15.175-15.802 0-.24-.003-.48-.014-.718 1.043-.783 1.95-1.762 2.662-2.876-.957.442-1.985.74-3.063.874z"
                                          fill-rule="evenodd"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('app')
);

