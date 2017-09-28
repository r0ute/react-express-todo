import React, {Component} from 'react';
import TodoList from './TodoList';

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        fetch('/api/todos').then(res => res.json())
            .then(todos => this.setState({todos: todos}));
    }

    render() {
        return (
            <div className="App">
                <TodoList todos={this.state.todos} />
            </div>
        );
    }
};