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
            <PrintTodo todo={todo} editTodo={updateTodo} removeTodo={deleteTodo} doneTodo={toggleTodo} key={todo.id} />
        )
    })

    const doneTodos = todos.filter((todo) => {
        return todo.isDone
    })
    const printDones = doneTodos.map(todo => {
        return(
            <PrintTodo todo={todo} editTodo={updateTodo} removeTodo={deleteTodo} doneTodo={toggleTodo} key={todo.id} />
        )
    })

    //Add Todos
    function createTodo(title: string) {
        let task = new TodoModel(todos.length +1, title, new Date(), false)
        setTodos([...todos, task])
        localStorage.setItem('list', JSON.stringify([...todos, task]))
    }

    //Update Todos
    function updateTodo(id: number, newTitle: string) {
        const updatedTodo = todos.find(todo => 
            todo.id === id
        )
        if(updatedTodo){
            updatedTodo.title = newTitle
        }
        setTodos([...todos])
        window.location.reload()
        localStorage.setItem('list', JSON.stringify([...todos]))
    }

    //Delete Todos
    function deleteTodo(id: number){
        const index = todos.map(todo => { return todo.id }).indexOf(id)
        todos.splice(index, 1)
        setTodos([...todos])
        localStorage.setItem('list', JSON.stringify([...todos]))
    }

    //Toggle status
    function toggleTodo(id: number) {
        const statusTodos = todos.map(todo => todo.id === id ? { ...todo, id: todo.id, isDone: !todo.isDone } : todo)
        setTodos(statusTodos)
        localStorage.setItem('list', JSON.stringify(statusTodos))
    }

    //Reset the list to uncompleted
    function resetList() {
        const listReset = todos.map(todo => todo ? { ...todo, isDone: false } : todo)
        setTodos(listReset)
        localStorage.setItem('list', JSON.stringify(listReset))
    }

    //Sorting
    function sortingList(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.value === "Oldest") {
            const sortingOldest = todos.sort((x, y) => +new Date(x.created) - +new Date(y.created))
            setTodos(sortingOldest)
            localStorage.setItem('list', JSON.stringify(sortingOldest))
        } else {
            const sortingNewest = todos.sort((x, y) => +new Date(y.created) - +new Date(x.created))
            setTodos(sortingNewest)
            localStorage.setItem('list', JSON.stringify(sortingNewest))
        }
        window.location.reload()
    }

    return(
        <React.Fragment>
            <div className = "todos">
                <div className = "todos-container">
                    <h3>All todos</h3>
                    <div className="print-undones">{printUndones}</div>

                    <AddTodo saveTodo={createTodo} />
                </div>

                <div className = "completedtodos-container">
                    <h3>Completed todos</h3>

                    <button className="reset-list" onClick={resetList}>Reset</button>

                    <select className="sorting-list" name="Sorting" id="sorting" onChange={sortingList}>
                        <option >Sorting</option>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                    </select>

                    <div className="print-dones">{printDones}</div>
                </div>
            </div>
        </React.Fragment>
    )
}