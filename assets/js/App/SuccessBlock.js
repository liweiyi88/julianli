import React from 'react';

export default function SuccessBlock(props) {
    return (
        <div className={`w-full bg-green-lightest text-green rounded mt-1 leading-tight font-semibold`}>
            <div className={`px-4 py-2`}>{props.message}</div>
        </div>
    );
}
