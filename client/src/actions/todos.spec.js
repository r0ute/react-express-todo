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
            .reply(200, todos);

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
            .reply(500, {message: errorMsg});

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
            type: 'text'
        };

        nock(resources.TODOS_PATH)
            .post('')
            .reply(201, todo);

        const store = mockStore({});
        const expectedActions = [
            actions.addTodoRequest(),
            actions.addTodoSuccess(todo)
        ];

        return store.dispatch(actions.addTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
