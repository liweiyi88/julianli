import React from 'react';

export default function ButtonDisabled() {
    return (
        <button
            disabled={true}
            className={`cursor-not-allowed opacity-75 bg-grey hover:bg-grey-dark focus:outline-none text-white font-bold py-3 px-4 rounded inline-flex items-center`}>
            <span>Sending..</span>
        </button>
    );
}
