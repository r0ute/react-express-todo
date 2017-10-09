import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RemoveTodo extends Component {

    handleRemoveTodoClick = (event) => {
        event.preventDefault();

        const {todo, removeTodo} = this.props;
        removeTodo(todo._id);
    };

    render() {
        return <input type="button" onClick={this.handleRemoveTodoClick} value="Remove"/>;
    }
}

RemoveTodo.propTypes = {
    todo: PropTypes.object.isRequired,
    removeTodo: PropTypes.func.isRequired
};

export default RemoveTodo;

