
import React, { useState, useEffect } from 'react';
import AddTaskForm from '../AddTaskForm';
import '../../App.css'
import Sidebar from '../Layout/Sidebar';

const Home = () => {
  // Your component code here

  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (!storedTasks) {
      const initialTasks = [
        { id: 1, title: 'Task 1', description: 'Description for Task 1', assignedTo: [], acceptedBy: [], status: 'Pending', createdAt: "2024-05-01T11:15:56.188Z" , updatedAt: "2024-05-01T11:19:46.291Z" },
        { id: 2, title: 'Task 2', description: 'Description for Task 2', assignedTo: [], acceptedBy: [], status: 'Pending', createdAt: "2024-05-01T11:15:56.188Z" , updatedAt: "2024-05-01T11:19:46.291Z" },
        { id: 3, title: 'Task 3', description: 'Description for Task 3', assignedTo: [], acceptedBy: [], status: 'Pending', createdAt: "2024-05-01T11:15:56.188Z" , updatedAt: "2024-05-01T11:19:46.291Z"  },
      ]
      setTasks(initialTasks);
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    } else {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  };


return (
  <div className="task-assignment">
  <div className="sidebar">
   <Sidebar/> 
  </div>
 
    <div className="task-list">
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', textAlign:'center' }}>Add New Task</h2>
      <AddTaskForm addTask={addTask} />
   

    <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', textAlign:'center' }}>Task List</h2>
    <ul className="task-list">
      {tasks?.map((task, index) => (
        <li key={index} className="task-item">
          <strong className="task-title">{task?.title}</strong> {task?.description},{' '}
          <span className={`task-status ${task?.status?.toLowerCase()}`}>{task?.status}</span>
        </li>
      ))}
    </ul>
    </div>
  </div>
);


}


export default Home



