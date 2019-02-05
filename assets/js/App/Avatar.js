import React from 'react';
import PropTypes from "prop-types";

export default function Avatar(props) {
    return (
        <div>
            <a href={'/'} onClick={props.onMobileMenuHidden}>
                <img src="https://avatars2.githubusercontent.com/u/7248260?s=460&v=4" alt="" className={`h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full`}/>
            </a>
        </div>
    );
}

Avatar.propTypes = {
    onMobileMenuHidden: PropTypes.func.isRequired
};
