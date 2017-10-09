import {connect} from 'react-redux';
import {fetchTodos} from '../actions/todos';
import TodoList from '../components/TodoList';

const mapStateToProps = ({todos, loading}) => ({
    todos,
    loading
});

const mapDispatchToProps = (dispatch) => ({
    fetchTodos: () => dispatch(fetchTodos())
});

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListContainer;