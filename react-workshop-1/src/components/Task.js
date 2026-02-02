import { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'


const Task = ({task, onDelete, onUpdate, onEdit}) => {
  const [showMenu, setShowMenu] = useState(false)

  const handleOption = (action) => {
    setShowMenu(false)
    if (action === 'edit') {
      onEdit(task)
    } else if (action === 'complete') {
      onUpdate(task.id, { ...task, completed: true })
    }
  }

  return (
    <div 
    className={`task ${task.reminder ? 'reminder' : ''}`}
       onDoubleClick={() => setShowMenu(!showMenu)}
       style={{ position: 'relative' }}
       >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: task.completed ? 'green' : 'orange',
            marginRight: '10px'
          }}></div>
          <div style={{ flex: 1 }}>
            <h3>{task.text} <FaXmark 
            style={{color: 'red', cursor: 'pointer'}}
            onClick={() => onDelete(task.id)}/>
            </h3>
            <p>{task.day}</p>
          </div>
        </div>

        {showMenu && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', zIndex: 10,
            display: 'flex', flexDirection: 'column', gap: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            <button onClick={() => handleOption('edit')}>Edit Task</button>
            <button onClick={() => handleOption('complete')}>Complete Task</button>
          </div>
        )}
    </div>
  )
}

export default Task