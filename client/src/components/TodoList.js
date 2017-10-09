import React, {Component} from 'react';
import RemoveTodoContainer from '../containers/RemoveTodoContainer';
import TodoContainer from '../containers/TodoContainer';
import PropTypes from 'prop-types';

class TodoList extends Component {
    componentDidMount() {
        this.props.fetchTodos();
    }

    render() {
        const {loading} = this.props;

        if (loading) {
            return (<p>Loading...</p>);
        }

        return (
            <ul>
                {this.props.todos.map(todo =>
                    <li key={todo._id}>
                        <RemoveTodoContainer todo={todo}/>
                        <TodoContainer todo={todo}/>
                    </li>
                )}
            </ul>
        );
    }
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchTodos: PropTypes.func.isRequired
};

export default TodoList;