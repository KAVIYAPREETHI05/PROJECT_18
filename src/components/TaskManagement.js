import React, { useState } from 'react';
import UserNewTaskPage from './UserNewTaskPage';
import UserOngoingTask from './UserOngoingTask';

function TaskManagement() {
  const [ongoingTasks, setOngoingTasks] = useState([]);

  const moveToOngoing = (task) => {
    setOngoingTasks([...ongoingTasks, task]);
  };

  return (
    <div>
      <UserNewTaskPage onTaskStart={moveToOngoing} />
      <UserOngoingTask initialTasks={ongoingTasks} />
    </div>
  );
}

export default TaskManagement;
