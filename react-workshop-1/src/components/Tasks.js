import Task from './Task'



const Tasks = ({tasks, onDelete, onUpdate, onEdit}) => {
return (
    <div>
    {tasks.map((task, index) => (
        <Task key={index} task={task}
        onDelete={onDelete} onUpdate={onUpdate} onEdit={onEdit}/>
        ))}
  </div>
  )
}


export default Tasks