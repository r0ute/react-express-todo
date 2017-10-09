import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions/todos';
import * as resources from '../config/resources';

const mockStore = configureMockStore([thunk]);

describe('fetch todos', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it('should trigger success event', () => {
        const todos = [{
            _id: 'id',
            text: 'test'
        }];

        nock(resources.TODOS_PATH)
            .get('')
            .reply(200, todos)
            .log(console.log);

        const store = mockStore({});
        const expectedActions = [
            actions.fetchTodosRequest(),
            actions.fetchTodosSuccess(todos)
        ];

        return store.dispatch(actions.fetchTodos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should trigger failure event', () => {
        const errorMsg = 'Server errorMsg.';

        nock(resources.TODOS_PATH)
            .get('')
            .reply(500, {message: errorMsg})
            .log(console.log);

        const store = mockStore({});
        const expectedActions = [
            actions.fetchTodosRequest(),
            actions.fetchTodosFailure(errorMsg)
        ];

        return store.dispatch(actions.fetchTodos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('add todo', () => {
    it('should trigger success event', () => {
        const todo = {
            text: 'test'
        };

        const addedTodo = {
            ...todo, _id: 1
        };

        nock(resources.TODOS_PATH)
            .post('', todo)
            .reply(201, addedTodo)
            .log(console.log);

        const store = mockStore({});
        const expectedActions = [
            actions.addTodoRequest(),
            actions.addTodoSuccess(addedTodo)
        ];

        return store.dispatch(actions.addTodo(todo.text)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should trigger failure event', () => {
        const todo = {
            text: ''
        };

        const errorMsg = 'Empty text.';

        nock(resources.TODOS_PATH)
            .post('', todo)
            .reply(400, {message: errorMsg})
            .log(console.log);

        const store = mockStore({});
        const expectedActions = [
            actions.addTodoRequest(),
            actions.addTodoFailure(errorMsg)
        ];

        return store.dispatch(actions.addTodo(todo.text)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

});


describe('remove todo', () => {
    it('should trigger success event', () => {
        const todoToRemoveId = 1;

        nock(resources.TODOS_PATH)
            .delete(`/${todoToRemoveId}`)
            .reply(200, {})
            .log(console.log);

        const store = mockStore({});
        const expectedActions = [
            actions.removeTodoRequest(),
            actions.removeTodoSuccess(todoToRemoveId)
        ];

        return store.dispatch(actions.removeTodo(todoToRemoveId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should trigger failure event', () => {
        const todoToRemoveId = 1;
        const errorMsg = 'Not found.';

        nock(resources.TODOS_PATH)
            .delete(`/${todoToRemoveId}`)
            .reply(404, {message: errorMsg})
            .log(console.log);

        const store = mockStore({});
        const expectedActions = [
            actions.removeTodoRequest(),
            actions.removeTodoFailure(errorMsg)
        ];

        return store.dispatch(actions.removeTodo(todoToRemoveId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

});