import * as actions from '../actions/todos';

const errors = (state = null, action) => {
    switch (action.type) {
        case actions.FETCH_TODOS_FAILURE:
            return action.error;
        default:
            return state;
    }
};

export default errors;