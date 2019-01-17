import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

export default function Avatar(props) {
    return (
        <div>
            <Link to={`/`} replace onClick={props.onMobileMenuHidden}>
                <img src="https://avatars2.githubusercontent.com/u/7248260?s=460&v=4" alt="" className={`h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full`}/>
            </Link>
        </div>
    );
}

Avatar.propTypes = {
    onMobileMenuHidden: PropTypes.func.isRequired
};
