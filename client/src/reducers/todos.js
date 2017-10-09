import * as types from '../actions/types';

const todos = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_TODOS_SUCCESS:
            return action.todos;
        case types.ADD_TODO_SUCCESS:
            return [...state, action.todo];
        case types.REMOVE_TODO_SUCCESS:
            return state.filter(item => item._id !== action.id);
        case types.TOGGLE_TODO_SUCCESS:
            return state.map(item => {
                if (item._id === action.id) {
                    return {...item, completed: action.completed};
                }

                return item;
            });
        default:
            return state;
    }
};

export default todos;