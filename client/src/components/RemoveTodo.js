import React, {Component} from 'react';

export default class RemoveTodo extends Component {

    handleRemoveTodoClick = (todo) => (event) => {
        event.preventDefault();
        this.props.onTodoRemoval(todo);
    }

    render() {
        return <input type="button" onClick={this.handleRemoveTodoClick(this.props.todo)} value="Remove"/>;
    }

};

