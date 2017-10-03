import * as actions from '../actions/dataFetching';

export default (state = {}, action) => {
    switch (action) {
        case actions.FETCHING_DATA:
            return {...state, loading: action.fetching};
        default:
            return state;
    }
};