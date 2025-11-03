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

    const addTask = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/todo", {
            task: task,
            status: status,
        })
        .then(() => {
            setTask("")
            setStatus("Pending")
            fetchTodo()
        })
        .catch((err) => console.log(err))
    }

    const deleteTask = (id) => {
        axios.delete(`http://localhost:3000/todo/${id}`)
        .then(() => fetchTodo())
        .catch((err) => console.log(err))
    }

    const openEditModel = (item) => {
        setEditMode(true);
        setCurrentTask(item);
        setNewTask(item.task);
        setNewStatus(item.status);
    }

    const updateTask = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/todo/${currentTask.id}`, {
            task: newTask,
            status: newStatus,
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
        <h1>TODO List</h1>
        <form onSubmit={addTask} className='p-1 border'>
            <input type="text" placeholder='Add task' value={task} onChange={(e) => setTask(e.target.value)}/>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{marginLeft: "10px"}}>
                <option value="Pending">Pending</option>
                <option value="WIP">WIP</option>
                <option value="Completed"> Completed</option>
            </select>
            <button type='submit' style={{marginLeft: "10px"}}>New Task</button>
        </form>

        <div className='taskList'>
            
            <table cellPadding="8" style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
                <tr>
                    <th>id</th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                {todo.map((list) => (
                    <tr  key={list.id}>
                        <td>{list.id}</td>
                        <td>{list.task}</td>
                        <td>{list.status}</td>
                        <td>
                            <button style={{marginLeft: "10px"}} onClick={() => openEditModel(list)} className='btn btn-primary'>Edit</button>
                            <button style={{marginLeft: "10px"}} onClick={() => deleteTask(list.id)} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                ))}
                
            </table>
           
        </div>
        
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