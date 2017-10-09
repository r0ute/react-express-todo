import React from 'react';
import './Error.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Error = ({errorMsg}) => (
    <span className={classnames('Error-message', {'Error-hidden': !errorMsg})}>{errorMsg}</span>
);


Error.propTypes = {
    errorMsg: PropTypes.string
};

export default Error;