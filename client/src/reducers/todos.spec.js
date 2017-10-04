import deepFreeze from 'deep-freeze';
import * as actions from '../actions/todos';
import todos from './todos';

describe('fetch todos', () => {
    it('should return an array of a single todo item', () => {
        const state = [];
        const action = actions.fetchTodosSuccess([{text: 'test'}]);

        deepFreeze(state);
        deepFreeze(action);

        expect(todos(state, action)).toEqual(action.todos);
    });

    it('should return an array of different todo items', () => {
        const state = [
            {text: 'test1'},
            {text: 'test2'}
        ];
        const action = actions.fetchTodosSuccess(
            {text: 'test3'},
            {text: 'test4'},
            {text: 'test5'}
        );

        deepFreeze(state);
        deepFreeze(action);

        expect(todos(state, action)).toEqual(action.todos);
    });
});