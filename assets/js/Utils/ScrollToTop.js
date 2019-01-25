import {withRouter} from "react-router-dom";
import {Component} from 'react';
import PropTypes from "prop-types";

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

ScrollToTop.propTypes = {
    location: PropTypes.string,
    children: PropTypes.any
};


export default withRouter(ScrollToTop);
