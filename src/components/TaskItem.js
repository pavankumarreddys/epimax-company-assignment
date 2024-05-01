import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task }) => {
  

  
  return (
    <div className="task-item2">
    <div className="task-info">
    <h4 style={{ fontFamily: ' sans-serif', marginBottom: '8px', color: '#333' }}>{task?.title}</h4>
    <p style={{ fontFamily: 'Arial, sans-serif', marginBottom: '4px' }}>Description: {task?.description}</p>
  </div>
    <div className="status">
      <span>Status:</span>
      <span style={{ color: task?.status === 'Pending' ? 'orange' : 'green' }}>{task?.status}</span>
    </div>
    <Link to={`/taskdetails/${task.id}`}>View Details</Link>
  </div>
  



  );
};

export default TaskItem;
