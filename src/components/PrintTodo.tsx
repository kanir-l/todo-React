import React from 'react';
import { TodoModel } from '../Models/TodoModel';

interface IPrintTodoProps{
    todo: TodoModel

    deleteTodo(id: number): void
}

export function PrintTodo(props: IPrintTodoProps) {
    function handleDelete(id: number) {
        props.deleteTodo(id)
    }

    const created = (new Date(props.todo.created)).toLocaleString()
    return(
        <div className = "print-todo-container">
            <span>{props.todo.title}</span>
            <i>{created}</i>
            <button onClick={()=>handleDelete(props.todo.id)}>Delete</button>
        </div>
    )
}