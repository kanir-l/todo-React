import React, { useState, useEffect } from 'react';
import { TodoModel } from '../Models/TodoModel';
import { PrintTodo } from '../components/PrintTodo';
import { AddTodo } from '../components/AddTodo';

export function Todos() {
    const [todos, setTodos] = useState<TodoModel[]>([])

    useEffect(() => {
        const todosFromLS = localStorage.getItem('list')
        if(todosFromLS) {
            const LStodos = JSON.parse(todosFromLS)
            setTodos(LStodos)
        }
    }, [])

    //Delete Todos
    function removeTodo(id: number){
        todos.splice(id, 1)
        console.log(id, todos)
        
        setTodos([...todos])
    }

    const prints = todos.map(todo => {
        return(
            <PrintTodo todo={todo} deleteTodo={removeTodo} key={todo.id} />
        )
    })

    //Add Todos
    function createTodo(title: string) {
        let task = new TodoModel(todos.length +1, title, new Date(), false)
        setTodos([...todos, task])
        localStorage.setItem('list', JSON.stringify([...todos, task]))
    }

    return(
        <div className = "todos-container">
            <div>{prints}</div>
            <AddTodo saveTodo={createTodo} />
        </div>
    )
}