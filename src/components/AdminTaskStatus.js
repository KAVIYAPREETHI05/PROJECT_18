import React, { useState, useEffect } from 'react';
import './AdminTaskStatus.css'; // Ensure you have a corresponding CSS file for styling

function AdminTaskStatus() {
  // Sample task data
  const [taskStatuses, setTaskStatuses] = useState([
    { id: 'SFA1', workerId: 'W01', description: 'Short Circuit', duration: '30 min 45 sec', status: 'Completed' },
    { id: 'ASB2', workerId: 'W02', description: 'Network Issue', duration: '45 min 30 sec', status: 'Pending' },
    { id: 'EWC3', workerId: 'W03', description: 'Wifi Problem', duration: '60 min 15 sec', status: 'In Progress' },
  ]);

  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const sortTasks = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedTasks = [...taskStatuses].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setTaskStatuses(sortedTasks);
    setSortColumn(column);
    setSortDirection(direction);
  };

  // Function to update task status
  const updateStatus = (id, newStatus) => {
    setTaskStatuses(taskStatuses.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // Function to handle status change
  const handleStatusChange = (e, id) => {
    updateStatus(id, e.target.value);
  };

  // Auto-timer for duration update (simulated)
  useEffect(() => {
    const timer = setInterval(() => {
      setTaskStatuses(prevTasks =>
        prevTasks.map(task => {
          const [mins, secs] = task.duration.split(' ').map(Number);
          const newSecs = (secs + 1) % 60;
          const newMins = mins + Math.floor((secs + 1) / 60);
          return {
            ...task,
            duration: `${newMins} min ${newSecs} sec`,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="admin-task-status">
      <h1>Task Status</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortTasks('id')}>Task ID {sortColumn === 'id' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
              <th onClick={() => sortTasks('workerId')}>Worker ID {sortColumn === 'workerId' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
              <th onClick={() => sortTasks('description')}>Task Description {sortColumn === 'description' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
              <th onClick={() => sortTasks('duration')}>Duration {sortColumn === 'duration' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
              <th onClick={() => sortTasks('status')}>Status {sortColumn === 'status' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskStatuses.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.workerId}</td>
                <td>{task.description}</td>
                <td>{task.duration}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(e, task.id)}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => updateStatus(task.id, task.status)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTaskStatus;
