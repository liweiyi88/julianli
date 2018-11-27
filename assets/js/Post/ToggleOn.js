import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToggleOn} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function ToggleOn(props) {
    const {
        id,
        toggleOnText,
        textColor,
        onToggle
    } = props;

    return (
        <div>
            <span className={`mr-1 ${textColor}`}>{toggleOnText}</span>
            <span onClick={(event) => onToggle(event, id)}><FontAwesomeIcon className={`cursor-pointer ${textColor}`} icon={faToggleOn} size="lg"/></span>
        </div>
    );
}

ToggleOn.propTypes = {
    id: PropTypes.number,
    toggleOnText: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    onToggle: PropTypes.func
};