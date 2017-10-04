import deepFreeze from 'deep-freeze';
import * as actions from '../actions/todos';
import dataFetching from './dataFetching';

describe('fetch todos', () => {
    it('should be fetching data', () => {
        const state = false;
        const action = actions.fetchTodos();

        deepFreeze(state);
        deepFreeze(action);

        expect(dataFetching(state, action)).toEqual(action.fetching);
    });

    it('should not be fetching data', () => {
        const state = false;
        const action = actions.fetchTodosSuccess([]);

        deepFreeze(state);
        deepFreeze(action);

        expect(dataFetching(state, action)).toEqual(action.fetching);
    });
});