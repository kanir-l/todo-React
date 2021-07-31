import React from 'react';
import { TodoModel } from '../Models/TodoModel';

interface IPrintTodoProps{
    todo: TodoModel

    deleteTodo(id: number): void

    doneTodo(id: number): void
}

export function PrintTodo(props: IPrintTodoProps) {

    function handleDelete(id: number) {
        props.deleteTodo(id)
    }

    const created = (new Date(props.todo.created)).toLocaleString()

    function handleDone(id: number) {
        props.doneTodo(id)
    }

    return(
        <div className = "print-todo-container">
            <p>{props.todo.title}</p>
            <i>{created}</i>
            {/* <button onClick={()=>handleDelete(props.todo.id)}>Delete</button> */}
            <img className ="garbage" src="/garbage.svg" onClick={()=>handleDelete(props.todo.id)} 
            alt="" />
            <button onClick={()=>handleDone(props.todo.id)}></button>
        </div>
    )
}