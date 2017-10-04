import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

const configureStore = () => createStore(rootReducer, applyMiddleware(...middlewares));

export default configureStore;