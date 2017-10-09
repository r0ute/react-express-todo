import React from 'react';
import TodoListContainer from '../containers/TodoListContainer';
import AddTodoContainer from '../containers/AddTodoContainer';
import ErrorContainer from '../containers/ErrorContainer';

const TodoApp = () => (
    <div>
        <AddTodoContainer/>
        <ErrorContainer/>
        <TodoListContainer/>
    </div>
);

export default TodoApp;