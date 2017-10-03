import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableTodo from './EditableTodo'

class TodoList extends Component {
    componentDidMount() {
        this.props.fetchTodos();
    }

    render() {
        const {todos, onTodoRemoval, onTodoChange} = this.props;

        return (<ul>
            {todos.map(todo => <EditableTodo
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
    fetchTodos: PropTypes.func.isRequired
};

export default TodoList;