import React from 'react';
import Todo from './Todo'

const TodoList = ({todos, onTodoRemove}) => (
    <ul>
        {todos.map(todo => <Todo key={todo._id} todo={todo} onTodoRemove={onTodoRemove}/>)}
    </ul>
);

export default TodoList;