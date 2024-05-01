import React, { useState } from 'react';
import '../App.css'
import Sidebar from './Layout/Sidebar';

const TaskStatusUpdates = ({ tasks, updateTaskStatus }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const getCurrentTime = () => {
    return new Date().toISOString();
  };

  const handleStatusChange = () => {
    if (selectedTask && newStatus) {
      const updatedTasks = tasks.map(task => {
        if (task.id === selectedTask) {
          return { ...task, status: newStatus, updatedAt: getCurrentTime() }; // Update updatedAt
        }
        return task;
      });

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      // Update tasks state immediately after updating status in local storage
      updateTaskStatus(selectedTask, newStatus); 

      setSelectedTask(null);
      setNewStatus('');
    }
  };

  
  return (
    <div className="task-assignment">
      <div className="sidebar">
       <Sidebar/>
      </div>
   
      <div className="task-status-updates">
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', textAlign:'center' }}>Update Tasks Status</h2>
        <ul className="task-list2">
          {tasks.map(task => (
            <li key={task.id} className="task-item2">
              
              <span style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '10px' }}>{task.title}</span>
                <span style={{ fontSize: '16px',  }}>Status: {task.status}</span>
                <button onClick={() => setSelectedTask(task.id)}>Update Status</button>
              
              {selectedTask === task.id && (
                <div className="status-buttons">
                  <select onChange={(e) => setNewStatus(e.target.value)} value={newStatus}>
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button onClick={handleStatusChange}>Update</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskStatusUpdates;
