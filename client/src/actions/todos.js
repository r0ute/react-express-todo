const TODOS_RESOURCE_PATH = '/api/todos';

/*
 * Fetch todos
 */

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

const fetchTodosRequest = () => ({
    type: FETCH_TODOS_REQUEST,
    fetching: true
});

export const fetchTodosSuccess = (todos) => ({
    type: FETCH_TODOS_SUCCESS,
    fetching: false,
    todos
});

const fetchTodosFailure = (error) => ({
    type: FETCH_TODOS_FAILURE,
    fetching: false,
    error
});

export const fetchTodos = () => (dispatch) => {
    dispatch(fetchTodosRequest());

    fetch(TODOS_RESOURCE_PATH).then(res =>
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
        console.log('Cannot fetch todos: ', err);
        dispatch(fetchTodosFailure(err));
    });
};

/*
 * Add todo
 */

export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';