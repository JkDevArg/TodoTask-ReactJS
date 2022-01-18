import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList';

const KEY = 'todoApp.todos'

export function App(){
    
    const [todos, setTodos] = useState([
        { id: 1, task: 'Tarea 1', completed: false }
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [... todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }
    
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevTodos) => {
            return [... prevTodos, { id: uuidv4(), task, completed: false }]
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (
        <div class="container sm-6">
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input class="form-control-sm" ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
            <button class="btn btn-secondary" onClick={handleTodoAdd}>➕</button>
            <button class="btn btn-danger" onClick={handleClearAll}>🗑️</button>
            <div class="text-light">Te quedan <span class="text-success">{todos.filter((todo) => !todo.completed).length}</span> tareas por terminar 🧾</div>
        </Fragment>
        </div>
    );
}