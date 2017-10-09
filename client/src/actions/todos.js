import fetch from 'isomorphic-fetch';
import * as resources from '../config/resources';
import * as types from './types';

/*
 * Fetch todos
 */

export const fetchTodosRequest = () => ({
    type: types.FETCH_TODOS_REQUEST
});

export const fetchTodosSuccess = (todos) => ({
    type: types.FETCH_TODOS_SUCCESS,
    todos
});

export const fetchTodosFailure = (errorMsg) => ({
    type: types.FETCH_TODOS_FAILURE,
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

/*
 * Toggle todo
 */

export const toggleTodoRequest = () => ({
    type: types.TOGGLE_TODO_REQUEST
});

export const toggleTodoSuccess = (id, completed) => ({
    type: types.TOGGLE_TODO_SUCCESS,
    id,
    completed
});

export const toggleTodoFailure = (errorMsg) => ({
    type: types.TOGGLE_TODO_FAILURE,
    errorMsg
});

export const toggleTodo = (id, completed) => (dispatch) => {
    dispatch(toggleTodoRequest());

    return fetch(`${resources.TODOS_PATH}/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({completed: completed})
    }).then(res => {
        return res.json().then(data => ({
            data: data,
            ok: res.ok
        }));
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.data.message);
        }

        return dispatch(toggleTodoSuccess(res.data._id, res.data.completed));
    }).catch(err => {
        console.error('Cannot toggle todo: ', err);

        return dispatch(toggleTodoFailure(err.message))
    });
};