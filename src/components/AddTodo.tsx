import React, { ChangeEvent, useState } from 'react';

interface IAddTodoProps {
    saveTodo(title: string): void
}

export function AddTodo(props: IAddTodoProps) {
    const [title, setTitle] = useState("")

    function inputTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    function saveTitle() {
        props.saveTodo(title)
        setTitle("")
    }

    return(
        <div className='addtodo-container'>
            <input type='text' placeholder='Add a list' onChange={inputTitle} value={title}/>
            <button onClick={saveTitle}>Add</button>
        </div>
    )
}