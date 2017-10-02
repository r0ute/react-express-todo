import React from 'react';
import RemoveTodo from './RemoveTodo'

const Todo = ({todo, onTodoRemove}) => (
    <li>
        <RemoveTodo todo={todo} onTodoRemove={onTodoRemove}/>
        {todo.text}
    </li>
);

export default Todo;