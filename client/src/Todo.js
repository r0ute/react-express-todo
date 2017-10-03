import React, {Component} from 'react';
import classnames from 'classnames';
import './Todo.css';

export default class Todo extends Component {
    handleClick = (event) => {
        event.preventDefault();
        this.props.onTodoChange({
            ...this.props.todo,
            completed: !this.props.todo.completed
        });
    };

    render() {
        return (<span
            onClick={this.handleClick}
            className={classnames('Todo', {'Todo-completed': this.props.todo.completed})}>
            {this.props.todo.text}
            </span>);
    }
};