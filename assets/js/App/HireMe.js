import React from "react";

export default function HireMe() {
    return (
        <div className={`mt-12 w-full lg:w-3/4`}>
            <div className={`w-full mb-6`}>
                <input
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                    id="your-name" type="text" placeholder="Your Name" />
            </div>
            <div className={`w-full mb-6`}>
                <input
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                    id="email" type="text" placeholder="Email" />
            </div>
            <div className={`w-full mb-6`}>
                <input
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                    id="subject" type="text" placeholder="Subject" />
            </div>
            <div className={`w-full mb-6`}>
                <textarea
                    className={`h-32 resize-none appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                    id="your-request" placeholder="Your request..." />
            </div>

            <div>
                <button
                    className={`bg-grey hover:bg-grey-dark focus:outline-none text-white font-bold py-3 px-4 rounded inline-flex items-center`}>
                    <span>Send</span>
                    <svg transform="rotate(45)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current ml-2">
                        <path className={`text-white`}
                              d="M12 20.1L3.4 21.9a1 1 0 0 1-1.3-1.36l9-18a1 1 0 0 1 1.8 0l9 18a1 1 0 0 1-1.3 1.36L12 20.1z"/>
                        <path className={`text-green`} d="M12 2c.36 0 .71.18.9.55l9 18a1 1 0 0 1-1.3 1.36L12 20.1V2z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
