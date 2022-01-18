import React from 'react'

export function TodoItem({ todo, toggleTodo }) {
    const { id, task, completed } = todo
    const handleTodoClick = () => {
        toggleTodo(id);
    };

    return (
        <li class="form-check">
            <input clas="form-check-input" type="checkbox" checked={completed} onChange={handleTodoClick} />
            <label class="form-check-label" for="flexCheckDefault">{task}</label>
        </li>
    );
}
