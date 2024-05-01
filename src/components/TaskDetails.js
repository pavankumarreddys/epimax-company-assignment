import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Sidebar from './Layout/Sidebar';

const TaskDetails = ({ tasks, users }) => {
  const { id } = useParams();

  // Check if tasks is not defined or empty
  if (!tasks || tasks.length === 0) {
    return <div className="task-details">No tasks available</div>;
  }

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return <div className="task-details">Task not found</div>;
  }

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getAssignedNames = (assignedIds) => {
    return assignedIds
      .map(id => {
        const assignedUser = users.find(user => user.id === id);
        return assignedUser ? assignedUser.name : null;
      })
      .filter(name => name)
      .join(', ');
  };
  
  return (
    <div className="task-assignment">
      <div className="sidebar">
        <Sidebar/>  
      </div>

      <div className="task-details-container">
        <h2>Task Details</h2>
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Created At:</strong> {formattedDate(task.createdAt)}</p>
        <p><strong>Updated At:</strong> {formattedDate(task.updatedAt)}</p>
        <p className="assigned-to">
          <strong>Assigned To:</strong> {task?.assignedTo?.length > 0 ? getAssignedNames(task?.assignedTo) : 'Not Assigned'}
        </p>
      </div>
    </div>
  );
};

export default TaskDetails;
