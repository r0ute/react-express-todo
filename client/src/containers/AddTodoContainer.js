import {connect} from 'react-redux';
import {addTodo} from '../actions/todos';
import AddTodo from '../components/AddTodo'

const mapDispatchToProps = (dispatch) => ({
    addTodo: (todo) => dispatch(addTodo(todo))
});

const AddTodoContainer = connect(null, mapDispatchToProps)(AddTodo);

export default AddTodoContainer;