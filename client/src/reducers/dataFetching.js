import * as types from '../actions/types';

export default (state = false, action) => {
    switch (action.type) {
        case types.FETCH_TODOS_REQUEST:
        case types.FETCH_TODOS_SUCCESS:
        case types.FETCH_TODOS_FAILURE:
        case types.ADD_TODO_REQUEST:
        case types.ADD_TODO_SUCCESS:
        case types.ADD_TODO_FAILURE:
            return action.fetching;
        default:
            return state;
    }
};