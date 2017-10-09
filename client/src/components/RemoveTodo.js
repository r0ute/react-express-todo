import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RemoveTodo extends Component {

    handleRemoveTodoClick = (todo) => (event) => {
        event.preventDefault();
        this.props.removeTodo(todo._id);
    }

    render() {
        return <input type="button" onClick={this.handleRemoveTodoClick(this.props.todo)} value="Remove"/>;
    }

}

RemoveTodo.propTypes = {
    todo: PropTypes.object.isRequired,
    removeTodo: PropTypes.func.isRequired
};

export default RemoveTodo;

