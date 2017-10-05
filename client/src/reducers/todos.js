import * as types from '../actions/types';

const todos = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_TODOS_SUCCESS:
            return action.todos;
        case types.ADD_TODO_SUCCESS:
            return [...state, action.todo];
        default:
            return state;
    }
};

export default todos;