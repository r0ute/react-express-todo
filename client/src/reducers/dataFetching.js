import * as types from '../actions/types';

export default (state = false, action) => {
    switch (action.type) {
        case types.FETCH_TODOS_REQUEST:
            return true;
        case types.FETCH_TODOS_SUCCESS:
        case types.FETCH_TODOS_FAILURE:
            return false;
        default:
            return state;
    }
};