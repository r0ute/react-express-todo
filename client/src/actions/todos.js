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

export const addTodoRequest = () => ({
    type: types.ADD_TODO_REQUEST,
    fetching: true
});

export const addTodoSuccess = (todo) => ({
    type: types.ADD_TODO_SUCCESS,
    fetching: false,
    todo
});

export const addTodoFailure = (errorMsg) => ({
    type: types.ADD_TODO_FAILURE,
    fetching: false,
    errorMsg
});

export const addTodo = (todo) => (dispatch) => {
    dispatch(addTodoRequest());

    return fetch(resources.TODOS_PATH, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({text: todo})
    }).then(res => res.json().then(data => ({
        data: data,
        ok: res.ok
    }))).then(res => {
        if (!res.ok) {
            throw new Error(res.data.message)
        }

        dispatch(addTodoSuccess(res.data));
    }).catch(err => {
        console.error('Cannot add todo: ', err);
        dispatch(addTodoFailure(err.message));

    });
};