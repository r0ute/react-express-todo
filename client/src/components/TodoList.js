import React, {Component} from 'react';
import Todo from './Todo';
import RemoveTodoContainer from '../containers/RemoveTodoContainer';
import PropTypes from 'prop-types';

class TodoList extends Component {
    componentDidMount() {
        this.props.fetchTodos();
    }

    render() {
        const {loading, onTodoCompletion} = this.props;

        if (loading) {
            return (<p>Loading...</p>);
        }

        return (
            <ul>
                {this.props.todos.map(todo =>
                    <li key={todo._id}>
                        <RemoveTodoContainer todo={todo}/>
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