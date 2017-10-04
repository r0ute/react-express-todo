import * as actions from '../actions/todos';

export default (state = false, action) => {
    switch (action.type) {
        case actions.FETCH_TODOS_REQUEST:
        case actions.FETCH_TODOS_SUCCESS:
        case actions.FETCH_TODOS_FAILURE:
            return action.fetching;
        default:
            return state;
    }
};