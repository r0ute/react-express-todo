import React from 'react';
import './Error.css';
import classnames from 'classnames';

const Error = ({errorMsg}) => {
    return (
        <span className={classnames('Error-message', {'Error-hidden': !errorMsg})}>{errorMsg}</span>
    );
};

export default Error;