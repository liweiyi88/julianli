import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToggleOn} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function ToggleOn(props) {
    const {
        toggleOnText,
        textColor
    } = props;

    return (
        <div>
            <span className={`mr-1 ${textColor}`}>{toggleOnText}</span>
            <span><FontAwesomeIcon className={`cursor-pointer ${textColor}`} icon={faToggleOn} size="lg"/></span>
        </div>
    );
}

ToggleOn.propTypes = {
    toggleOnText: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired
};