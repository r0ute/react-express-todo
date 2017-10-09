import * as types from '../actions/types';

const errors = (state = '', action) => {
    switch (action.type) {
        case types.FETCH_TODOS_FAILURE:
        case types.ADD_TODO_FAILURE:
        case types.REMOVE_TODO_FAILURE:
            return action.errorMsg;
        default:
            return state;
    }
};

export default errors;