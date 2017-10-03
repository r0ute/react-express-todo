import * as errors from './errors';
import * as dataFetching from './dataFetching';

export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';

const TODOS_RESOURCE_PATH = '/api/todos';

export const fetchTodos = () => (dispatch) => {
    dispatch(dataFetching.fetchingData(true));

    fetch(TODOS_RESOURCE_PATH).then(res => {
        dispatch(dataFetching.fetchingData(false));

        return res.json().then(data => ({
            data: data,
            ok: res.ok
        }));
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.data.message);
        }

        dispatch(fetchTodosSucess(res.data));
    }).catch(err => {
        console.log('Cannot dataFetching todos: ', err);
        dispatch(errors.errorOccurred(err));
    });
};

export const fetchTodosSucess = (todos) => ({
    type: FETCH_TODOS_SUCCESS,
    todos
});