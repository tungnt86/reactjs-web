import React from 'react';
import PropTypes from 'prop-types'
import App from './app'

//Follows: https://medium.com/@danielnmai/load-css-in-react-server-side-rendering-with-isomorphic-style-loader-848c8140a096

class ContextProvider extends React.Component {
    getChildContext() {
        return { ...this.props.context }
    }

    render () {
        return <App { ...this.props } />
    }
}

ContextProvider.childContextTypes = {
    insertCss: PropTypes.func,
    data: PropTypes.any
};

export default ContextProvider;