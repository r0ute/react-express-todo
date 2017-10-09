import React, {Component} from 'react';
import RemoveTodo from './RemoveTodo';
import Todo from './Todo';
import PropTypes from 'prop-types';

class TodoList extends Component {
    componentDidMount() {
        this.props.fetchTodos();
    }

    render() {
        const {loading, onTodoRemoval, onTodoCompletion} = this.props;

        if (loading) {
            return (<p>Loading...</p>);
        }

        return (
            <ul>
                {this.props.todos.map(todo =>
                    <li key={todo._id}>
                        <RemoveTodo
                            todo={todo}
                            onTodoRemoval={onTodoRemoval}
                        />
                        <Todo
                            todo={todo}
                            onTodoCompletion={onTodoCompletion}
                        />
                    </li>
                )}
            </ul>
        );
    }
}
;

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchTodos: PropTypes.func.isRequired
};

export default TodoList;