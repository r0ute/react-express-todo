import React from 'react';
import EditableTodo from './EditableTodo'

const TodoList = ({todos, onTodoRemoval, onTodoCompletion}) => (
    <ul>
        {todos.map(todo => <EditableTodo
            key={todo._id}
            todo={todo}
            onTodoRemoval={onTodoRemoval}
            onTodoCompletion={onTodoCompletion}
        />)}
    </ul>
);

export default TodoList;