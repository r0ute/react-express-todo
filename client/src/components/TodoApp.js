import React, {Component} from 'react';
import TodoListContainer from '../containers/TodoListContainer';
import AddTodo from './AddTodo';

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    handleTodoCreation = (todo) => {
        fetch('/api/todos', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({text: todo})
        }).then(res => res.json().then(data => ({
            data: data,
            ok: res.ok
        }))).then(res => {
            if (!res.ok) {
                throw new Error(res.data.message)
            }

            this.setState(prevState => ({
                todos: [...prevState.todos, res.data]
            }));
        }).catch(err => console.log('Cannot add todo: ', err));
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
            <div className="App">
                <AddTodo onTodoAdd={this.handleTodoCreation}/>
                <TodoListContainer
                    todos={this.state.todos}
                    onTodoRemoval={this.handleTodoRemoval}
                    onTodoChange={this.handleTodoModification}
                />
            </div>
        );
    }
};