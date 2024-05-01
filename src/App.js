import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import TaskAssignment from './components/TaskAssignment';
import TaskStatusUpdates from './components/TaskStatusUpdates';
import Home from './components/MyTaskDashboard/Home'
// import Sidebar from './components/Layout/Sidebar';
import TaskDetails from './components/TaskDetails'


const users = [
  { id: 1, name: 'David Miller', role: 'Backend Developer' },
  { id: 2, name: 'Sophia Williams', role: 'Graphic Designer' },
  { id: 3, name: 'Matthew Martinez', role: 'Product Owner' },
  { id: 4, name: 'Olivia Jones', role: 'DevOps Engineer' },
  { id: 5, name: 'Daniel Thompson', role: 'System Analyst' },
];



const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Project A', description: 'Description for Project A', assignedTo: [], acceptedBy: [], status: 'Pending', createdAt: "2024-05-01T11:15:56.188Z" , updatedAt: "2024-05-01T11:19:46.291Z" },
    { id: 2, title: 'Project B', description: 'Description for Project B', assignedTo: [], acceptedBy: [], status: 'Pending', createdAt: "2024-05-01T11:15:56.188Z" , updatedAt: "2024-05-01T11:19:46.291Z" },
    { id: 3, title: 'Project C', description: 'Description for Project C', assignedTo: [], acceptedBy: [], status: 'Pending', createdAt: "2024-05-01T11:15:56.188Z" , updatedAt: "2024-05-01T11:19:46.291Z"  },
]
);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // Store default tasks in localStorage if not already present
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  

  
  const assignTask = (taskId, assignedUsers) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.assignedTo.push(...assignedUsers);
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  
  const getCurrentTime = () => {
    return new Date().toISOString();
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus, updatedAt: getCurrentTime() }; 
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update localStorage
  };
  

  return (
    <Router>
    <div className="app-container">
     
      <div className="main-content">
      <Routes>
      <Route path="/" exact element={<Home />} />
<Route path="/tasklist" element={<TaskList tasks={tasks} />} />
<Route
  path="/taskdetails/:id"
  element={<TaskDetails tasks={tasks} users={users} />}
/>

<Route
  path="/createtask"
  element={<AddTaskForm addTask={addTask} />}
/>
<Route
  path="/assigntask"
  element={<TaskAssignment tasks={tasks} users={users} assignTask={assignTask} />}
/>
<Route
  path="/updatetask"
  element={<TaskStatusUpdates tasks={tasks} updateTaskStatus={updateTaskStatus} />}
/>


</Routes>
       
      </div>
    </div>
  </Router>
  );
};

export default App;

{/* <div className="app">
<h1>Task Management App</h1>
<div className="main-content">
  <div className="task-management">
    <h2>Task List</h2>
    <AddTaskForm addTask={addTask} />
    <TaskList tasks={tasks} />
  </div>
  <div className="task-actions">
    <h2>Task Actions</h2>
    {tasks.map(task => (
      <TaskAssignment key={task.id} taskId={task.id} assignTask={assignTask} users={users} />
    ))}
    {tasks.map(task => (
      <TaskStatusUpdates key={task.id} taskId={task.id} currentStatus={task.status} updateStatus={updateStatus} />
    ))}
  </div>
</div>
<TaskSummaryPage tasks={tasks} />
</div> */}