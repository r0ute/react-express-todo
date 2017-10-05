import * as types from '../actions/types';

const errors = (state = '', action) => {
    switch (action.type) {
        case types.FETCH_TODOS_FAILURE:
            return action.errorMsg;
        default:
            return state;
    }
};

export default errors;