import * as actions from '../actions/errors';

const errors = (state = {}, action) => {
    switch (action.type) {
        case actions.ERROR_OCCURRED:
            return {...state, errorMsg: action.error};
        default:
            return state;
    }
};

export default errors;