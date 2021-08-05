import React, { ChangeEvent, useState } from 'react';
import { TodoModel } from '../Models/TodoModel';

interface IPrintTodoProps{
    todo: TodoModel

    removeTodo(id: number): void

    editTodo(id: number, newtitle: string): void

    doneTodo(id: number): void
}

export function PrintTodo(props: IPrintTodoProps) {

    //Add
    const created = (new Date(props.todo.created)).toLocaleString()

    //Delete
    function handleRemove(id: number) {
        props.removeTodo(id)
    }

    //Edit
    const [edits, setEdits] = useState<boolean>(false)
    function handleEdit(id: number) {
        setEdits(!edits)
    }

    const [newTitle, setNewTitle] = useState("")
    function inputNewTitle(e: ChangeEvent<HTMLInputElement>) {
        setNewTitle(e.target.value)
    }

    function handleSave(id: number, newTitle: string) {
        props.editTodo(id, newTitle)
    }

    //Status
    function handleDone(id: number) {
        props.doneTodo(id)
    }

    
    return(
        <div className = "print-todo-container">
            { edits ? 
                <div>
                    <input type='text' placeholder={props.todo.title} onChange={inputNewTitle} value={newTitle}/> 
                    <button className ="save"  onClick={()=>handleSave(props.todo.id, newTitle)}>
                        <img className ="save" src="/save.png" alt="" />
                    </button>
                </div> : 
                <p>{props.todo.title}</p> 
            }
            
        
            <i>{created}</i>

            <img className ="garbage" src="/garbage.png" onClick={()=>handleRemove(props.todo.id)} 
            alt="" />

             <img className ="edit" src="/edit.png" onClick={()=>handleEdit(props.todo.id)} 
            alt="" />

            <img className ="activate" src="/activate.svg" onClick={()=>handleDone(props.todo.id)} 
            alt="" />
        </div>
    )
}