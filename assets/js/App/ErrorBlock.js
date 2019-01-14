import React from 'react';
import PropTypes from "prop-types";

export default function ErrorBlock(props) {
    return (
        <div className={`w-full bg-red-lightest text-red rounded mt-1 leading-tight font-semibold`}>
            <div className={`px-4 py-2`}>{props.message}</div>
        </div>
    );
}

ErrorBlock.propTypes = {
    message: PropTypes.string
};
