// AddTaskForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddTaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const getCurrentTime = () => {
    return new Date().toISOString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '' || description.trim() === '') {
      alert('Please enter a valid task name and description.');
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: taskName,
      description: description,
      assignedTo: [],
      status: 'Pending',
      acceptedBy: [],
      createdAt: getCurrentTime(),
      updatedAt: getCurrentTime(),
    };

    addTask(newTask);
    setTaskName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className="input-field"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="textarea-field"
        />
      </div>
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
