import React from 'react';
import RemoveTodo from './RemoveTodo';
import Todo from './Todo';

const TodoList = ({todos, onTodoRemoval, onTodoCompletion}) => (
    <ul>
        {todos.map(todo =>
            <li key={todo._id}>
                <RemoveTodo
                    todo={todo}
                    onTodoRemoval={onTodoRemoval}
                />
                <Todo
                    todo={todo}
                    onTodoCompletion={onTodoCompletion}
                />
            </li>
        )}
    </ul>
);

export default TodoList;