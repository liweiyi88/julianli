import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonSend(props) {
    return (
        <button
            onClick={props.onButtonClicked}
            className={`bg-grey hover:bg-grey-dark focus:outline-none text-white font-bold py-3 px-4 rounded inline-flex items-center`}>
            <span>Send</span>
            <svg fill={`#07cb79`} className={`full-current w-3 h-3 ml-2`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 0l20 10L0 20V0zm0 8v4l10-2L0 8z"/></svg>
        </button>
    );
}

ButtonSend.propTypes = {
    onButtonClicked: PropTypes.func
}
