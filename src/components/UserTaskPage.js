import React, { useState } from 'react';
import '../CSS/UserTaskPage.css'; // Ensure you have a corresponding CSS file for styling

function UserTaskPage() {
  // Sample tasks data
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Complete project report', duration: '2 hours', status: 'Incomplete' },
    { id: 2, name: 'Attend team meeting', duration: '1 hour', status: 'Complete' },
    { id: 3, name: 'Submit expense report', duration: '30 minutes', status: 'Incomplete' },
    { id: 4, name: 'Prepare presentation slides', duration: '2 hours', status: 'Complete' },
  ]);

  // Sorting functionality
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const sortTasks = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setTasks(sortedTasks);
    setSortColumn(column);
    setSortDirection(direction);
  };

  return (
    <div className="user-task-page">
      <h1>User Task Page</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortTasks('id')}>Task ID {sortColumn === 'id' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
              <th onClick={() => sortTasks('name')}>Task Name {sortColumn === 'name' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
              <th onClick={() => sortTasks('duration')}>Duration {sortColumn === 'duration' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
              <th onClick={() => sortTasks('status')}>Status {sortColumn === 'status' ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.duration}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTaskPage;
