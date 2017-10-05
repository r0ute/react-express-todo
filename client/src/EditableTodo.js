import React from 'react';
import RemoveTodo from './RemoveTodo';
import Todo from './Todo';

const EditableTodo = ({todo, onTodoRemoval, onTodoCompletion}) => (
    <li>
        <RemoveTodo
            todo={todo}
            onTodoRemoval={onTodoRemoval}
        />
        <Todo
            todo={todo}
            onTodoCompletion={onTodoCompletion}
        />
    </li>
);

export default EditableTodo;