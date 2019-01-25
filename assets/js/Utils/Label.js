import React from 'react';

export default function Label(props) {
    return (
        <span className={'rounded-sm bg-grey-lighter text-grey-darker uppercase px-2 py-1 text-sm ml-3 cursor-pointer hover:bg-grey-light'}>{props.name}</span>
    )
}
