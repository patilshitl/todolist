import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [todo, setTodo] = useState([]);
    const [task, setTask] = useState("");
    const [status, setStatus] = useState("Pending")

    const [editMode, setEditMode] = useState(false);
    const [currentTask, setCurrentTask] = useState(null)
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("Pending")

    const fetchTodo = () => {
        axios.get("http://localhost:3000/todo")
        .then((res) => {
            setTodo(res.data)
        })
    }

    const addTask = () => {
        axios.post("http://localhost:3000/todo", {task, status})
        .then(() => {
            setTask("")
            setStatus("Pending")
            fetchTodo()
        })
        .catch((err) => console.log(err))
    }

    const deleteTask = () => {
        axios.delete(`http://localhost:3000/todo${id}`)
        .then(() => fetchTodo())
        .catch((err) => console.log(err))
    }

    const openEditModel = (item) => {
        setEditMode(true);
        setCurrentTask(item);
        setNewTask(item.task);
        setNewStatus(item.status);
    }

    const updateTask = () => {
        axios.put(`http://localhost:3000/todo/${currentTask.id}`, {
            task: setNewTask,
            status: setNewStatus,
        })
        .then(() => {
            setEditMode(false);
            setCurrentTask(null);
            fetchTodo();
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchTodo();
    }, [])
  return (
    <div>
        <form onSubmit={addTask}>
            <input type="text" placeholder='Add task' value={task} onChange={(e) => setTask(e.target.value)}/>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{marginLeft: "10px"}}>
                <option value="Pending">Pending</option>
                <option value="WIP">WIP</option>
                <option value="Completed"> Completed</option>
            </select>
            <button type='submit' style={{marginLeft: "10px"}}>New Task</button>
        </form>
        {todo.map((list) => (
            <li key={list.id}> 
            <span>{list.task} - <strong>{list.status}</strong></span>
            <button style={{marginLeft: "10px"}} onClick={() => openEditModel(list)}>Edit</button>
            <button style={{marginLeft: "10px"}} onClick={() => deleteTask(list.id)}>Delete</button>
            </li>
        ))}
        {editMode && (
            <form onSubmit={updateTask}>
            <input type="text" placeholder='Add task' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} style={{marginLeft: "10px"}}>
                <option value="Pending">Pending</option>
                <option value="WIP">WIP</option>
                <option value="Completed"> Completed</option>
            </select>
            <button type='submit' style={{marginLeft: "10px"}}>Update Task</button>
        </form>
        )}
    </div>
  )
}

export default Todo