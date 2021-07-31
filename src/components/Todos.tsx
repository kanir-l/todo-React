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

    const undoneTodos = todos.filter((todo) => {
        return !todo.isDone
    })
    const printUndones = undoneTodos.map(todo => {
        return(
            <PrintTodo todo={todo} deleteTodo={removeTodo} doneTodo={toggleTodo} key={todo.id} />
        )
    })

    const doneTodos = todos.filter((todo) => {
        return todo.isDone
    })
    const printDones = doneTodos.map(todo => {
        return(
            <PrintTodo todo={todo} deleteTodo={removeTodo} doneTodo={toggleTodo} key={todo.id} />
        )
    })

    //Delete Todos
    function removeTodo(id: number){
        const index = todos.map(todo => { return todo.id }).indexOf(id)
        todos.splice(index, 1)
        setTodos([...todos])
        localStorage.setItem('list', JSON.stringify([...todos]))
    }

    //Add Todos
    function createTodo(title: string) {
        let task = new TodoModel(todos.length +1, title, new Date(), false)
        setTodos([...todos, task])
        localStorage.setItem('list', JSON.stringify([...todos, task]))
    }

    //Toggle status
    function toggleTodo(id: number) {
        const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, id: todo.id, isDone: !todo.isDone } : todo)
        setTodos(updatedTodos)
        localStorage.setItem('list', JSON.stringify(updatedTodos))
    }

    return(
        <React.Fragment>
            <div className = "todos">
                <div className = "todos-container">
                    <h3>All todos</h3>
                    <div className="print-undones">{printUndones}</div>
                    <AddTodo saveTodo={createTodo} />
                </div>

                <div className = "dones-container">
                    <h3>Completed todos</h3>
                    <div className="print-dones">{printDones}</div>
                </div>
            </div>
        </React.Fragment>
    )
}