import {connect} from 'react-redux';
import RemoveTodo from '../components/RemoveTodo';
import {removeTodo} from '../actions/todos';

const mapDispatchToProps = (dispatch) => ({
    removeTodo: (id) => dispatch(removeTodo(id))
});

const RemoveTodoContainer = connect(null, mapDispatchToProps)(RemoveTodo);

export default RemoveTodoContainer;