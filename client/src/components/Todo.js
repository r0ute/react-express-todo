import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './Todo.css';

class Todo extends Component {
    handleClick = (event) => {
        event.preventDefault();

        const {toggleTodo, todo} = this.props;
        toggleTodo(todo._id, !todo.completed);
    };

    render() {
        const {todo} = this.props;

        return (
            <span
                onClick={this.handleClick}
                className={classnames('Todo', {'Todo-completed': todo.completed})}
            >
                {todo.text}
            </span>
        );
    }
}

Todo.propTypes = {
    todo: PropTypes.object.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default Todo;