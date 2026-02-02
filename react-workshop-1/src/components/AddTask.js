import { useState, useEffect } from 'react';

const AddTask = ({onAdd, onUpdate, taskToEdit}) => {
    const [text, setText] = useState('')
    const [reminder, setReminder] = useState(false)
    const [selectedDay, setSelectedDay] = useState('Monday')
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [ampm, setAmpm] = useState('am')

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(() => {
        if (taskToEdit) {
            setText(taskToEdit.text)
            setReminder(taskToEdit.reminder)
            
            const match = taskToEdit.day ? taskToEdit.day.match(/^(\w+) at (\d+):(\d+) (am|pm)$/) : null
            if (match) {
                setSelectedDay(match[1])
                setHours(match[2])
                setMinutes(match[3])
                setAmpm(match[4])
            } else {
                setSelectedDay('Monday')
                setHours('')
                setMinutes('')
                setAmpm('am')
            }
        } else {
            setText('')
            setReminder(false)
            setSelectedDay('Monday')
            setHours('')
            setMinutes('')
            setAmpm('am')
        }
    }, [taskToEdit])

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please add a task')
            return
        }

        if (!hours || !minutes) {
            alert('Please add a time')
            return
        }

        const formattedMinutes = minutes.toString().padStart(2, '0')
        const day = `${selectedDay} at ${hours}:${formattedMinutes} ${ampm}`

        if (taskToEdit) {
            onUpdate(taskToEdit.id, { ...taskToEdit, text, day, reminder })
        } else {
            onAdd({text, day, reminder})
        }

        setText('')
        setReminder(false)
        setSelectedDay('Monday')
        setHours('')
        setMinutes('')
        setAmpm('am')
    }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task' 
            value={text} onChange={(e) => setText(e.target.value)}/>
        </div>


        <div className='form-control'>
            <label>Day & Time</label>
            <div style={{ display: 'flex', gap: '10px' }}>
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} style={{ flex: 1, padding: '5px' }}>
                    {days.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input type='number' placeholder='HH' min='1' max='12' value={hours} onChange={(e) => setHours(e.target.value)} style={{ width: '50px', padding: '5px' }} />
                    <span>:</span>
                    <input type='number' placeholder='MM' min='0' max='59' value={minutes} onChange={(e) => setMinutes(e.target.value)} style={{ width: '50px', padding: '5px' }} />
                    <select value={ampm} onChange={(e) => setAmpm(e.target.value)} style={{ padding: '5px' }}>
                        <option value='am'>am</option>
                        <option value='pm'>pm</option>
                    </select>
                </div>
            </div>
        </div>

        <div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input type='checkbox' 
            checked={reminder} 
            value={reminder} 
            onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input type='submit' value={taskToEdit ? 'Update Task' : 'Save Task'} 
        className='btn btn-block'/>


    </form>
  )
}

export default AddTask