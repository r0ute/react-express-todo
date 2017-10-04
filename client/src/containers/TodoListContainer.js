import {connect} from 'react-redux';
import {fetchTodos} from '../actions/todos';
import TodoList from '../components/TodoList';

const mapStateToProps = (state) => ({
    todos: state.todos,
    loading: state.loading
});

const mapDispatchToProps = (dispatch) => ({
    fetchTodos: () => dispatch(fetchTodos())
});

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListContainer;