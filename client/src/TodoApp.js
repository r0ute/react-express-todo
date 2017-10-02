import React, {Component} from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        fetch('/api/todos').then(res => res.json().then(data => ({
            data: data,
            ok: res.ok
        }))).then(res => {
            if (!res.ok) {
                throw new Error(res.data.message);
            }

            this.setState({todos: res.data});
        }).catch(err => console.log('Cannot fetch todos: ', err));
    }

    handleAddTodo = (todo) => {
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

            this.setState({todos: [...this.state.todos, res.data]});
        }).catch(err => console.log('Cannot add todo: ', err));
    }

    handleRemoveTodo = (todo) => {
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

            this.setState({todos: this.state.todos.filter(item => item._id !== todo._id)});
        }).catch(err => console.log('Cannot remove todo: ', err));
    }

    render() {
        return (
            <div className="App">
                <AddTodo onTodoAdd={this.handleAddTodo}/>
                <TodoList todos={this.state.todos} onTodoRemove={this.handleRemoveTodo}/>
            </div>
        );
    }
};