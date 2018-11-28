import React from 'react';
import PropTypes from 'prop-types';
import ToggleOn from './ToggleOn';
import ToggleOff from './ToggleOff';

export default function Toggle(props) {
    const {
        toggle,
        toggleOnText,
        toggleOnTextColor,
        toggleOffText,
        toggleOffTextColor,
        onToggleClick
    } = props;

    return toggle ? (
        <ToggleOn toggleOnText={toggleOnText} textColor={toggleOnTextColor} onToggleClick={onToggleClick}/>
    ) : (
        <ToggleOff toggleOffText={toggleOffText} textColor={toggleOffTextColor} onToggleClick={onToggleClick}/>
    )
}

Toggle.propTypes = {
    toggle: PropTypes.bool.isRequired,
    toggleOnText: PropTypes.string.isRequired,
    toggleOnTextColor: PropTypes.string.isRequired,
    toggleOffText: PropTypes.string.isRequired,
    toggleOffTextColor: PropTypes.string.isRequired,
    onToggleClick: PropTypes.func
};