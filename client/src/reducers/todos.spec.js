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

describe('add todo', () => {
    it('should add new todo when state is empty', () => {
        const state = [];
        const action = actions.addTodoSuccess({
            text: 'test'
        });

        deepFreeze(state);
        deepFreeze(action);

        expect(todos(state, action)).toEqual([action.todo]);
    });

    it('should add new todo when todo list is not empty', () => {
        const state = [{
            text: 'test 1'
        }];
        const action = actions.addTodoSuccess({
            text: 'test 2'
        });

        deepFreeze(state);
        deepFreeze(action);

        expect(todos(state, action)).toEqual([...state, action.todo]);
    });
});

describe('remove todo', () => {
    it('should remove existing todo', () => {
        const todoToRemove = {
            _id: 1,
            text: 'bye'
        };

        const todoToPreserve = {
            _id: 2,
            text: 'test'
        };

        const state = [todoToPreserve, todoToRemove];
        const action = actions.removeTodoSuccess(todoToRemove._id);

        deepFreeze(state);
        deepFreeze(action);

        expect(todos(state, action)).toEqual([todoToPreserve]);
    });

    it('should not remove any todo that does not exist', () => {
        const todoToRemoveId = 1;
        const state = [{
            _id: 2,
            text: 'test'
        }];

        const action = actions.removeTodoSuccess(todoToRemoveId);

        deepFreeze(state);
        deepFreeze(action);

        expect(todos(state, action)).toEqual(state);
    });

});

describe('toggle todo', () => {
    it('should toggle completed todo', () => {
        const todo = {
            _id: 1,
            text: 'test',
            completed: true
        };

        const state = [todo];
        const action = actions.toggleTodoSuccess(todo._id, false);

        deepFreeze(state);
        deepFreeze(action);

        expect(todos(state, action)).toEqual([{...todo, completed: !todo.completed}]);
    });
    it('should toggle active todo', () => {
        const todo = {
            _id: 1,
            text: 'test',
            completed: false
        };

        const state = [todo];
        const action = actions.toggleTodoSuccess(todo._id, true);

        deepFreeze(state);
        deepFreeze(action);

        expect(todos(state, action)).toEqual([{...todo, completed: !todo.completed}]);
    });
});