import * as actions from '../actions/todos';

const todos = (state = {}, action) => {
    switch (action) {
        case actions.FETCH_TODO_SUCCESS:
            return {
                ...state,
                todos: action.todos,
            };
        case actions.ADD_TODO_SUCCESS:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.todo
                ],
            };
        default:
            return state;
    }
};

export default todos;