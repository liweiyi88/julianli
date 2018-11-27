import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToggleOff} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function ToggleOff(props) {
    const {
        toggleOffText,
        textColor
    } = props;

    return (
        <div>
            <span className={`mr-1 ${textColor}`}>{toggleOffText}</span>
            <span><FontAwesomeIcon className={`cursor-pointer ${textColor}`} icon={faToggleOff} size="lg"/></span>
        </div>
    );
}

ToggleOff.propTypes = {
    toggleOffText: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired
};