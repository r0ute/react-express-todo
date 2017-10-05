import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableTodo from './EditableTodo'

class TodoList extends Component {
    componentDidMount() {
        this.props.fetchTodos();
    }

    render() {
        const {loading, onTodoRemoval, onTodoChange} = this.props;

        if (loading) {
            return (<p>Loading...</p>);
        }

        return (<ul>
            {this.props.todos.map(todo => <EditableTodo
                key={todo._id}
                todo={todo}
                onTodoRemoval={onTodoRemoval}
                onTodoChange={onTodoChange}
            />)}
        </ul>);
    }
}
;

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchTodos: PropTypes.func.isRequired
};

export default TodoList;