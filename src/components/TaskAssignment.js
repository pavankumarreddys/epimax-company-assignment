import React, { useState, useEffect } from 'react';
import '../App.css';
import Sidebar from './Layout/Sidebar';

const TaskAssignment = ({ assignTask, users }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        } else {
          console.error('Tasks data is not an array:', parsedTasks);
        }
      } catch (error) {
        console.error('Error parsing tasks data from localStorage:', error);
      }
    }
  }, []);

  const handleTaskSelect = (taskId) => {
    setSelectedTask(taskId);
    setShowAssignModal(true);
  };

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleAssignTask = () => {
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTask) {
        return {
          ...task,
          assignedTo: [
            ...task.assignedTo,
            ...selectedUsers.map(userId => ({
              id: userId,
              name: users.find(user => user.id === userId).name
            }))
          ]
        };
      }
      return task;
    });

    assignTask(selectedTask, selectedUsers);
    setSelectedUsers([]);
    setSelectedTask(null);
    setShowAssignModal(false);

    // Update tasks in localStorage after assigning task
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  console.log("taskassihnment", tasks)
  return (
    <div className="task-assignment">
      <div className="sidebar">
       <Sidebar/>  
      </div>
      <div className="task-list">
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', textAlign:'center' }}>Tasks</h2>
       
         {tasks.map(task => (
          <div key={task.id} className="task-item">
            
              <h3>{task.title}</h3>
              <button onClick={() => handleTaskSelect(task.id)}>Assign</button>
           
          </div>
        ))}
      </div>

      {showAssignModal && (
        <div className="assign-modal">
          <h3>Assign Users to Task</h3>
          <div className="user-list">
            {users.map(user => (
              <div key={user.id}>
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  value={user.id}
                  onChange={() => handleCheckboxChange(user.id)}
                  checked={selectedUsers.includes(user.id)}
                />
                <label htmlFor={`user-${user.id}`}>{user.name}</label>
              </div>
            ))}
          </div>
          <button onClick={handleAssignTask}>Assign</button>
        </div>
      )}
    </div>
  );
};

export default TaskAssignment;
