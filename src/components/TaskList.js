import React from 'react';
import TaskItem from './TaskItem';
import Sidebar from './Layout/Sidebar';
import '../App.css'

const TaskList = ({ tasks }) => {
  console.log("tasklist,", tasks)
  return (
    <div className="task-assignment">
      <div className="sidebar">
       <Sidebar/>
      </div>
      <div className='task-list'>
       <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', textAlign:'center' }}>List Of Tasks</h1>
      {tasks?.map(task => <TaskItem key={task?.id} task={task} />)}
      </div>
    </div>
  );
};

export default TaskList;
