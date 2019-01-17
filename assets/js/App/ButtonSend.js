import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonSend(props) {
    return (
        <button
            onClick={props.onButtonClicked}
            className={`bg-grey hover:bg-grey-dark focus:outline-none text-white font-bold py-3 px-4 rounded inline-flex items-center`}>
            <span>Send</span>
            <svg transform="rotate(45)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current ml-2">
                <path className={`text-white`}
                      d="M12 20.1L3.4 21.9a1 1 0 0 1-1.3-1.36l9-18a1 1 0 0 1 1.8 0l9 18a1 1 0 0 1-1.3 1.36L12 20.1z"/>
                <path className={`text-green`} d="M12 2c.36 0 .71.18.9.55l9 18a1 1 0 0 1-1.3 1.36L12 20.1V2z"/>
            </svg>
        </button>
    );
}

ButtonSend.propTypes = {
    onButtonClicked: PropTypes.func
}
