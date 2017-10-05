import fetch from 'isomorphic-fetch';
import * as resources from '../config/resources';
import * as types from './types';

/*
 * Fetch todos
 */

export const fetchTodosRequest = () => ({
    type: types.FETCH_TODOS_REQUEST,
    fetching: true
});

export const fetchTodosSuccess = (todos) => ({
    type: types.FETCH_TODOS_SUCCESS,
    fetching: false,
    todos
});

export const fetchTodosFailure = (errorMsg) => ({
    type: types.FETCH_TODOS_FAILURE,
    fetching: false,
    errorMsg
});

export const fetchTodos = () => (dispatch) => {
    dispatch(fetchTodosRequest());

    return fetch(resources.TODOS_PATH).then(res =>
        res.json().then(data => ({
            data: data,
            ok: res.ok
        }))
    ).then(res => {
        if (!res.ok) {
            throw new Error(res.data.message);
        }

        dispatch(fetchTodosSuccess(res.data));
    }).catch(err => {
        console.error('Cannot fetch todos: ', err);
        dispatch(fetchTodosFailure(err.message));
    });
};

/*
 * Add todo
 */
