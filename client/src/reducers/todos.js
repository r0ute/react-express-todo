import * as actions from '../actions/todos';

const todos = (state = [], action) => {
    switch (action.type) {
        case actions.FETCH_TODOS_SUCCESS:
            return action.todos;
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