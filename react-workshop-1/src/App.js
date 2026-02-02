import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  const [tasks, setTasks] = useState([])

  useEffect (() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

//fetch tasks
   const fetchTasks = async () => {
      const res = await fetch ('http://localhost:8000/tasks')
      const data = await res.json()
      console.log('Tasks fetched from backend:', data)

  return data
}

//add task
const addTask = async (task) => {
  const res = await fetch('http://localhost:8000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])

}

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

//Update Task
const updateTask = async (id, updTask) => {
  const res = await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask), 
  })

  const data = await res.json()

  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, ...data } : task
    )
  )
}

//Edit Task
const editTask = (task) => {
  setTaskToEdit(task)
  setShowAddTask(true)
}

//Save Edited Task
const saveEditedTask = async (id, updTask) => {
  await updateTask(id, updTask)
  setTaskToEdit(null)
}

  return (
    <Router>
   
    <div className= 'container'>
    <Header
    onAdd={() => {
      setShowAddTask(!showAddTask)
      setTaskToEdit(null)
    }}
    showAdd={showAddTask} />
    
    <Routes>
      <Route path='/' element={
        <>
          {showAddTask && <AddTask onAdd={addTask} onUpdate={saveEditedTask} taskToEdit={taskToEdit} />}
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1, border: '1px solid orange', padding: '10px', borderRadius: '5px' }}>
              <h3 style={{ color: 'orange' }}>Pending Tasks</h3>
              {tasks.filter((task) => !task.completed).length > 0 ? (
                <Tasks tasks={tasks.filter((task) => !task.completed)} onDelete={deleteTask} onUpdate={updateTask} onEdit={editTask}/>
              ) : ('No Pending Tasks')}
            </div>
            <div style={{ flex: 1, border: '1px solid green', padding: '10px', borderRadius: '5px' }}>
              <h3 style={{ color: 'green' }}>Completed Tasks</h3>
              {tasks.filter((task) => task.completed).length > 0 ? (
                <Tasks tasks={tasks.filter((task) => task.completed)} onDelete={deleteTask} onUpdate={updateTask} onEdit={editTask}/>
              ) : ('No Completed Tasks')}
            </div>
          </div>
        </>
      } />
      <Route path='/about' element={<About />} />
    </Routes>

    <Footer />
    </div>

  </Router>
 
    
  )
}


export default App;
