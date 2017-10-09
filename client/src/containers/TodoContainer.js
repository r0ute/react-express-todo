import {connect} from 'react-redux';
import Todo from '../components/Todo';
import {toggleTodo} from '../actions/todos';

const mapDispatchToProps = (dispatch) => ({
    toggleTodo: (id, completed) => dispatch(toggleTodo(id, completed))
});

const TodoContainer = connect(null, mapDispatchToProps)(Todo);

export default TodoContainer;