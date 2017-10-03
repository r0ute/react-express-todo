import React from 'react';
import RemoveTodo from './RemoveTodo';
import Todo from './Todo';

const EditableTodo = ({todo, onTodoRemoval, onTodoChange}) => (
    <li>
        <RemoveTodo
            todo={todo}
            onTodoRemoval={onTodoRemoval}
        />
        <Todo
            todo={todo}
            onTodoChange={onTodoChange}
        />
    </li>
);

export default EditableTodo;