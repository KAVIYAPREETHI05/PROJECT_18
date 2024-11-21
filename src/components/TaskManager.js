// src/components/TaskManager.js
import React, { useState } from 'react';
import UserNewTaskPage from './UserNewTaskPage';
import UserOngoingTask from './UserOngoingTask';

const initialTasks = [
    { id: 21868, description: 'Server Setup', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
    // Add more initial tasks here if needed
];

function TaskManager() {
    const [newTasks, setNewTasks] = useState(initialTasks);
    const [ongoingTasks, setOngoingTasks] = useState([]);

    const startTask = (taskId) => {
        const taskToStart = newTasks.find(task => task.id === taskId);
        if (taskToStart) {
            setNewTasks(newTasks.filter(task => task.id !== taskId));
            setOngoingTasks([...ongoingTasks, taskToStart]);
        }
    };

    return (
        <div>
            <h1>User Task Manager</h1>
            <UserNewTaskPage tasks={newTasks} onStartTask={startTask} />
            <UserOngoingTask tasks={ongoingTasks} />
        </div>
    );
}

export default TaskManager;
