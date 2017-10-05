import deepFreeze from 'deep-freeze';
import * as actions from '../actions/todos';
import errors from './errors';

describe('fetch todos', () => {
    it('should get an error', () => {
        const state = '';
        const action = actions.fetchTodosFailure('error');

        deepFreeze(state);
        deepFreeze(action);

        expect(errors(state, action)).toEqual(action.errorMsg);
    });
});