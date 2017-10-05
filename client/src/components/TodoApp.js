import React, {Component} from 'react';
import TodoListContainer from '../containers/TodoListContainer';
import AddTodoContainer from '../containers/AddTodoContainer';

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    handleTodoRemoval = (todo) => {
        fetch('/api/todos/' + todo._id, {
            method: 'DELETE'
        }).then(res => {
            return res.json().then(data => ({
                data: data,
                ok: res.ok
            }))
        }).then(res => {
            if (!res.ok) {
                throw new Error(res.data.message);
            }

            this.setState(prevState => ({
                todos: prevState.todos.filter(item => item._id !== todo._id)
            }));
        }).catch(err => console.log('Cannot remove todo: ', err));
    }

    handleTodoModification = (todo) => {
        fetch('/api/todos/' + todo._id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(todo)
        }).then(res => {
            return res.json().then(data => ({
                data: data,
                ok: res.ok
            }));
        }).then(res => {
            if (!res.ok) {
                throw new Error(res.data.message);
            }

            this.setState(prevState => ({
                todos: prevState.todos.map(todo => {
                    return (todo._id === res.data._id)
                        ? res.data
                        : todo;
                })
            }));
        });
    };

    render() {
        return (
            <div>
                <AddTodoContainer/>
                <TodoListContainer
                    onTodoRemoval={this.handleTodoRemoval}
                    onTodoChange={this.handleTodoModification}
                />
            </div>
        );
    }
};