import {combineReducers} from 'redux';
import todos from './todos';
import errors from './errors';
import dataFetching from './dataFetching';

const rootReducer = combineReducers({
    todos,
    loading: dataFetching,
    errorMsg: errors
});

export default rootReducer;