import React from 'react';
import EditableTodo from './EditableTodo'

const TodoList = ({todos, onTodoRemoval, onTodoChange}) => (
    <ul>
        {todos.map(todo => <EditableTodo
            key={todo._id}
            todo={todo}
            onTodoRemoval={onTodoRemoval}
            onTodoChange={onTodoChange}
        />)}
    </ul>
);

export default TodoList;