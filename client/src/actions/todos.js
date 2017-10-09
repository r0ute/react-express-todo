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

        return dispatch(fetchTodosSuccess(res.data));
    }).catch(err => {
        console.error('Cannot fetch todos: ', err);

        return dispatch(fetchTodosFailure(err.message));
    });
};

/*
 * Add todo
 */

export const addTodoRequest = () => ({
    type: types.ADD_TODO_REQUEST
});

export const addTodoSuccess = (todo) => ({
    type: types.ADD_TODO_SUCCESS,
    todo
});

export const addTodoFailure = (errorMsg) => ({
    type: types.ADD_TODO_FAILURE,
    errorMsg
});

export const addTodo = (text) => (dispatch) => {
    dispatch(addTodoRequest());

    return fetch(resources.TODOS_PATH, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({text: text})
    }).then(res => res.json().then(data => ({
        data: data,
        ok: res.ok
    }))).then(res => {
        if (!res.ok) {
            throw new Error(res.data.message)
        }

        return dispatch(addTodoSuccess(res.data));
    }).catch(err => {
        console.error('Cannot add todo: ', err);

        return dispatch(addTodoFailure(err.message));
    });
};

/*
 * Remove todo
 */

export const removeTodoRequest = () => ({
    type: types.REMOVE_TODO_REQUEST,
});

export const removeTodoSuccess = (id) => ({
    type: types.REMOVE_TODO_SUCCESS,
    id
});

export const removeTodoFailure = (errorMsg) => ({
    type: types.REMOVE_TODO_FAILURE,
    errorMsg
});

export const removeTodo = (id) => (dispatch) => {
    dispatch(removeTodoRequest(id));

    return fetch(`${resources.TODOS_PATH}/${id}`, {
        method: 'DELETE'
    }).then(res => {
        return res.json().then(data => ({
            data: data,
            ok: res.ok
        }))
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.data.message);
        }

        return dispatch(removeTodoSuccess(id));
    }).catch(err => {
        console.error('Cannot remove todo: ', err);

        return dispatch(removeTodoFailure(err.message));
    });

};